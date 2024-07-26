const { InvalidArgumentGRPC } = require("@/cors");
const responseCodesPG = require("./codes/errorCodePg");
const errorReasonsPG = require("./codes/errorReasonsPg");

class ErrorHandlerPG {
  static handlePostgresError(error) {
    console.log(error);
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
    throw new InvalidArgumentGRPC({
      description: "Unknown error",
    });
  }
}

module.exports = ErrorHandlerPG;
