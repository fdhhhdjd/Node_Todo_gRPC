const { randomHelpers } = require("@/helpers");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: "user_id", as: "todos" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          user.picture = randomHelpers.generateAvatar(user.fullname);
        },
      },
    },
  );

  return User;
};
