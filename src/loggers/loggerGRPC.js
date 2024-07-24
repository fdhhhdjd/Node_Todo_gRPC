const grpc = require("@grpc/grpc-js");
const winston = require("winston");

class GRPCInterceptor {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  createInterceptor() {
    return (options, nextCall) => {
      return new grpc.InterceptingCall(nextCall(options), {
        start: (metadata, listener, next) => {
          this.logger.info(`Received call at: ${new Date()}`);
          console.log(`Listener: ${listener}`);
          next(metadata, {
            onReceiveStatus: (status, next) => {
              this.logger.info(`Call status: ${status.code}`);
              next(status);
            },
          });
        },
      });
    };
  }
}

module.exports = new GRPCInterceptor();
