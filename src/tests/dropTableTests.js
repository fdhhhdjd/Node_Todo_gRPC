const { Sequelize } = require("sequelize");
const pg = require("pg");
const types = require("pg-types");
const {
  pgConfigs: {
    pg: { user, host, database, password, port },
  },
} = require("@/configs");

// Override BIGINT type to return a number instead of string
types.setTypeParser(20, (val) => parseInt(val, 10));

const sequelizeInstance = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

(async () => {
  try {
    await sequelizeInstance.query(
      "ALTER TABLE public.todos DROP CONSTRAINT IF EXISTS todos_user_id_fkey;",
    );
    await sequelizeInstance.query("DROP TABLE IF EXISTS public.todos;");
    await sequelizeInstance.query("DROP TABLE IF EXISTS public.users;");
    console.log("Tables deleted successfully.");
  } catch (error) {
    console.error("Error deleting tables:", error);
  } finally {
    await sequelizeInstance.close();
  }
})();
