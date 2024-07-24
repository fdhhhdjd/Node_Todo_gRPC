module.exports = {
  //* Success
  Ok: require('./success.response').Ok,

  //* Error
  BadRequest: require('./error.response').BadRequestResponse,
  NotFound: require('./error.response').NotFoundError,
};
