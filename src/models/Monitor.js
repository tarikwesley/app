const { Model, DataTypes } = require('sequelize')

class Monitor extends Model {
  static init(sequelize) {
    super.init({
      corrente: DataTypes.DOUBLE,
      potencia: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }
}

module.exports = Monitor