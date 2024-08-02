const { NotFoundResponse } = require("./errorGRPC.response");

module.exports = {
  // Todo: --------- Rest API ---------
  //* Success
  Ok: require("./success.response").Ok,
  Created: require("./success.response").Created,

  //* Error
  BadRequest: require("./error.response").BadRequestResponse,
  NotFound: require("./error.response").NotFoundError,
  Unauthorized: require("./error.response").UnauthorizedResponse,

  // Todo: --------- GRPC ---------
  NotFoundGRPC: require("./errorGRPC.response").NotFoundGRPC,
  InvalidArgumentGRPC: require("./errorGRPC.response").InvalidArgumentGRPC,
};
