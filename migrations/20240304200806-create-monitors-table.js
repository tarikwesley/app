'use strict'

const moment = require('moment-timezone')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('monitors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      corrente: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      potencia: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
        return moment
          .utc(this.getDataValue('created_at'))
          .tz('America/Sao_Paulo')
          .format()
        },
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('monitors')
  },
}
