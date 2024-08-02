const axios = require("axios");
const crypto = require("crypto");
const {
  appConfigs: {
    app: { keySecretV1 },
  },
} = require("@/configs");

const secretKey = keySecretV1;
const apiUrl = "http://localhost:5000/api/v1"; // URL of API

// Func create and send request
const callSecureApi = async () => {
  // Create nonce random
  const nonce = crypto.randomBytes(16).toString("hex");

  // Get current timestamp (in seconds since Epoch)
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const apiKey = "xxx-yyy"; // API key of you

  // Create baseString from nonce, timestamp, and api key to verify the signature
  const baseString = nonce + timestamp + apiKey;

  // Create signature using HMAC SHA256
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(baseString)
    .digest("hex");

  try {
    // Send request with Axios
    const response = await axios.get(apiUrl, {
      headers: {
        signature: signature,
        nonce: nonce,
        timestamp: timestamp,
        version: "v1",
        apiKey: apiKey,
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error calling API:",
      error.response ? error.response.data : error.message,
    );
  }
};

// Call request to API
callSecureApi();
