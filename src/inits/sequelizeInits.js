const { Sequelize } = require("sequelize");
const pg = require("pg");
const types = require("pg-types");
const {
  pgConfigs: {
    pg: { user, host, database, password, port },
  },
} = require("@/configs");
const { appConstants, timeConstants, pgConstants } = require("@/constants");
const { appHelpers } = require("@/helpers");

// Override BIGINT type to return a number instead of string
types.setTypeParser(20, (val) => parseInt(val, 10));

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
      dialectModule: pg,
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
      define: {
        // This option ensures that the table names are not pluralized
        freezeTableName: true,
        // This option ensures that the default timestamp fields (createdAt, updatedAt) are used
        timestamps: true,
      },
      typeValidation: true, // Ensures that the data types used are valid
    });

    this.client.instanceConnect = sequelizeInstance;
    this.handleEventConnect();
  }

  getDatabase() {
    return this.client.instanceConnect;
  }
}

module.exports = new DatabaseManager();
