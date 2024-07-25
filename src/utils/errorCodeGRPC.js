const grpc = require("@grpc/grpc-js");

const errorCodes = {
  CANCELLED: {
    code: grpc.status.CANCELLED,
    message: "Request was cancelled",
  },
  UNKNOWN: {
    code: grpc.status.UNKNOWN,
    message: "Unknown error occurred",
  },
  INVALID_ARGUMENT: {
    code: grpc.status.INVALID_ARGUMENT,
    message: "Invalid argument provided",
  },
  DEADLINE_EXCEEDED: {
    code: grpc.status.DEADLINE_EXCEEDED,
    message: "Deadline exceeded",
  },
  NOT_FOUND: {
    code: grpc.status.NOT_FOUND,
    message: "Resource not found",
  },
  ALREADY_EXISTS: {
    code: grpc.status.ALREADY_EXISTS,
    message: "Resource already exists",
  },
  RESOURCE_EXHAUSTED: {
    code: grpc.status.RESOURCE_EXHAUSTED,
    message: "Resource exhausted",
  },
  FAILED_PRECONDITION: {
    code: grpc.status.FAILED_PRECONDITION,
    message: "Failed precondition",
  },
  ABORTED: {
    code: grpc.status.ABORTED,
    message: "Operation aborted",
  },
  OUT_OF_RANGE: {
    code: grpc.status.OUT_OF_RANGE,
    message: "Out of range",
  },
  UNIMPLEMENTED: {
    code: grpc.status.UNIMPLEMENTED,
    message: "Unimplemented method",
  },
  INTERNAL: {
    code: grpc.status.INTERNAL,
    message: "Internal error occurred",
  },
  UNAVAILABLE: {
    code: grpc.status.UNAVAILABLE,
    message: "Service unavailable",
  },
  DATA_LOSS: {
    code: grpc.status.DATA_LOSS,
    message: "Data loss occurred",
  },
  UNAUTHENTICATED: {
    code: grpc.status.UNAUTHENTICATED,
    message: "Unauthenticated request",
  },
  DEFAULT: {
    code: grpc.status.UNKNOWN,
    message: "An unknown error occurred",
  },
};

module.exports = errorCodes;
