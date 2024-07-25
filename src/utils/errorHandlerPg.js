const { InvalidArgumentGRPC } = require("@/cors");
const responseCodesPG = require("./codes/errorCodePg");
const errorReasonsPG = require("./codes/errorReasonsPg");

class ErrorHandlerPG {
  static handlePostgresError(error) {
    const code = error.parent.code || "";

    const description = Object.keys(responseCodesPG).find(
      (key) => responseCodesPG[key] === code,
    );
    const reason = errorReasonsPG[code] || "Unknown error";

    console.log({
      code,
      description,
      reason,
    });

    if (description) {
      throw new InvalidArgumentGRPC({
        message: description,
      });
    }
    return {
      code,
      description: "Unknown error",
      reason,
    };
  }
}

module.exports = ErrorHandlerPG;
