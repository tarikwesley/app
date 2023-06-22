const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/Database")

class Monitor extends Model {}
Monitor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    current: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    power: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "monitors",
  }
)

module.exports = Monitor
