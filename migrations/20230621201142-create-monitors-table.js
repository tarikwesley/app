"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("monitors", {
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
        })
      },
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("monitors")
      },
    }
  },

  async down(queryInterface, Sequelize) {},
}
