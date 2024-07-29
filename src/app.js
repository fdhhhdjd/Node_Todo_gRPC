//* LIB
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet").default;
const morgan = require("morgan");

require("dotenv").config();

//* REQUIRE
const { ErrorCustom } = require("@/utils");
const { appHelpers } = require("@/helpers");

//* USED LIB
const app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(appHelpers.getMorganFormat()));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

//* GLOBAL
require("@/globals");

//* GROUP VERSION
const apiRouter = express.Router();

const v1Router = require("@/app/v1/routes");

apiRouter.use("/v1", v1Router);

//* ROUTES
app.use("/api", apiRouter);

//* STREAMING
require("@/streamings/subStreamings");

//* NOT FOUND 404
app.use(ErrorCustom.notFoundHandler);

//* ERROR 5xx
app.use(ErrorCustom.errorHandler);

module.exports = app;
