const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }

  Todo.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "todos",
      timestamps: true,
      underscored: true, // Used type set name snake_case all fields
      hooks: {},
    },
  );

  return Todo;
};
