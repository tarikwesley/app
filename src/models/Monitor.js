const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/Database')
const moment = require('moment-timezone')

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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment
          .utc(this.getDataValue('created_at'))
          .tz('America/Sao_Paulo')
          .format()
      },
    },
  },
  {
    sequelize,
    modelName: 'app',
    tableName: 'monitors',
    timestamps: false,
    hooks: {
      beforeCreate: (monitor, options) => {
        monitor.created_at = moment().tz('America/Sao_Paulo').format()
      },
    },
  }
)

module.exports = Monitor
