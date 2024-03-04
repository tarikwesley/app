'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('app', {
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
        })
      },
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('app')
      },
    }
  },

  async down(queryInterface, Sequelize) {},
}
