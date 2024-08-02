const { timeConstants, appConstants } = require("@/constants");
const { BadRequest, Unauthorized } = require("@/cors");
const { randomHelpers } = require("@/helpers");

class SignatureVerifier {
  constructor() {
    this.usedNonces = new Set();
    this.verifySignature = this.verifySignature.bind(this);
  }

  verifySignature(req, __, next) {
    // 1. Signature: Digital signature, created from request data to verify the integrity and authenticity of the request.
    // 2. Nonce: A random value that can only be used once, to prevent replay attacks.
    // 3. Time: Time current, to prevent replay attacks.
    // 4. Version: Version of the signature algorithm.
    // 5. API Key: Key to authenticate the request.
    const { signature, nonce, timestamp, version, apikey } = req.headers;

    // Check all fields are provided
    if (!signature || !nonce || !timestamp || !version || !apikey) {
      throw new BadRequest({
        message: "Missing required headers.",
      });
    }

    // Check timestamp to make sure the request is not too old (e.g., 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - timestamp > timeConstants._1_MINUTES / 1000) {
      throw new BadRequest({
        message: "Request is too old.",
      });
    }

    // Check none to make sure the request is not replayed
    if (this.usedNonces.has(nonce)) {
      throw new BadRequest({
        message: "Replay attack detected.",
      });
    }

    // Create baseString from nonce, timestamp, and api key to verify the signature
    const baseString = nonce + timestamp + apikey;
    let expectedSignature;

    // Create signature based on version
    if (version === appConstants.VERSIONS[0]) {
      expectedSignature = randomHelpers.createSignatureV1(baseString);
    } else if (version === appConstants.VERSIONS[1]) {
      expectedSignature = randomHelpers.createSignatureV2(baseString);
    } else {
      throw new BadRequest({
        message: "Unsupported version.",
      });
    }

    // Accuracy flow control
    if (expectedSignature !== signature) {
      throw new Unauthorized({
        message: "Invalid signature.",
      });
    }

    // Save none used to prevent replay attack in the future
    this.usedNonces.add(nonce);

    next();
  }
}

module.exports = new SignatureVerifier();
