const Sequelize = require("sequelize");
const db = require("../utils/database");

const Monitor = db.define("monitors", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  current: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  power: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Monitor;