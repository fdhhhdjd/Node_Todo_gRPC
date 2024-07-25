const { NotFound } = require("@/cors");
const statusCodes = require("./codes/statusCodes");
const reasonPhrases = require("./codes/reasonPhrases");

const notFoundHandler = (_, __, next) => {
  const error = new NotFound();
  next(error);
};

const errorHandler = (error, __, res, ____) => {
  const statusCode = error.status || statusCodes.INTERNAL_SERVER_ERROR;
  const errorCode = error.code || statusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = error.message || reasonPhrases.INTERNAL_SERVER_ERROR;
  const errorDetails = error.details || [];
  const errorTime = error.timestamp || new Date().getTime();

  const response = {
    status: statusCode,
    code: errorCode,
    message: errorMessage,
    details: errorDetails,
    timestamp: errorTime,
  };
  if (process.env.NODE_ENV === "dev") {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
