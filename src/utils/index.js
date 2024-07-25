module.exports = {
  //* Code, Reason
  StatusCodes: require("./codes/statusCodes"),
  ReasonPhrases: require("./codes/reasonPhrases"),
  ErrorCode: require("./codes/errorCode"),
  ErrorCodeGRPC: require("./codes/errorCodeGRPC"),
  ErrorReasonsPg: require("./codes/errorReasonsPg"),
  ErrorCodePg: require("./codes/errorCodePg"),

  //* Handle Error
  AsyncHandler: require("./asyncHandler"),
  ErrorCustom: require("./errorHandler"),
  ErrorHandlerGRPC: require("./errorHandlerGRPC"),
  ErrorHandlerPg: require("./errorHandlerPg"),
};
