const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/Database')
const moment = require('moment')

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment.utc(this.getDataValue('createdAt')).format()
      },
    },
  },
  {
    sequelize,
    modelName: 'app',
    hooks: {
      beforeCreate: (monitor, options) => {
        monitor.createdAt = moment.utc().format()
      },
    },
  }
)

module.exports = Monitor
