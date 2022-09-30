const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Monitor = require('../models/Monitor')

const connection = new Sequelize(dbConfig)

console.log("Conexão estabelecida com sucesso ao banco de dados.")

Monitor.init(connection)

module.exports = connection