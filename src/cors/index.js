const { NotFoundResponse } = require("./errorGRPC.response");

module.exports = {
  // Todo: --------- Rest API ---------
  //* Success
  Ok: require("./success.response").Ok,
  Created: require("./success.response").Created,

  //* Error
  BadRequest: require("./error.response").BadRequestResponse,
  NotFound: require("./error.response").NotFoundError,

  // Todo: --------- GRPC ---------
  NotFoundGRPC: require("./errorGRPC.response").NotFoundGRPC,
  InvalidArgumentGRPC: require("./errorGRPC.response").InvalidArgumentGRPC,
};
