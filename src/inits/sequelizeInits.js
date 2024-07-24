const { Sequelize } = require("sequelize");
const {
  pgConfigs: {
    pg: { user, host, database, password, port },
  },
} = require("@/configs");
const { appConstants, timeConstants, pgConstants } = require("@/constants");
const { appHelpers } = require("@/helpers");

class DatabaseManager {
  constructor() {
    this.client = {};
    this.connectTimeout = null;
  }

  handleTimeoutError() {
    this.connectTimeout = setTimeout(() => {
      console.error("Failed to connect to PostgreSQL database");
      throw new Error("Failed to connect to PostgreSQL database");
    }, timeConstants._10_SECONDS);
  }

  async handleEventConnect() {
    try {
      await this.client.instanceConnect.authenticate();
      console.info("CONNECTED TO POSTGRESQL SUCCESS 🐘 !!");

      await this.syncDatabase();
    } catch (err) {
      console.error("Failed to connect to PostgreSQL database", err);
      this.handleTimeoutError();
    }
  }

  async syncDatabase() {
    try {
      const User = require("@/app/v1/models/orm/userORM")(
        this.client.instanceConnect,
      );
      const Todo = require("@/app/v1/models/orm/todoORM")(
        this.client.instanceConnect,
      );

      User.associate({ Todo });
      Todo.associate({ User });

      await this.client.instanceConnect.sync({ force: false }); // 'force: false' keep data old
      console.info("Database & tables created!");
    } catch (error) {
      console.error("Unable to sync the database:", error);
    }
  }

  initDatabase() {
    const sequelizeInstance = new Sequelize(database, user, password, {
      host: host,
      port: port,
      dialect: pgConstants.DIALECT[0],
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        min: 10,
        max: 20,
        acquire: timeConstants._30_SECONDS,
        idle: timeConstants._30_SECONDS,
      },
      logging: appHelpers.isNodeEnvMatch(appConstants.NODE_ENVS[0])
        ? // ? console.log
          false
        : false,
    });

    this.client.instanceConnect = sequelizeInstance;
    this.handleEventConnect();
  }

  getDatabase() {
    return this.client.instanceConnect;
  }
}

module.exports = new DatabaseManager();
