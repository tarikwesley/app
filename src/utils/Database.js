const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.PGDATABASE || 'app',
  process.env.PGUSER || 'postgres',
  process.env.PGPASSWORD || 'postgres',
  {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
  }
)

try {
  sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Error in connection with database: ', error)
}

module.exports = sequelize
