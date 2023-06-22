const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  process.env.PGDATABASE || "app",
  process.env.PGUSER || "postgres",
  process.env.PGPASSWORD || "postgres",
  {
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT || 5432,
    dialect: "postgres",
  }
)

try {
  sequelize.authenticate()
  console.log("Conexão bem-sucedida.")
} catch (error) {
  console.error("Não foi possível conectar ao banco de dados:", error)
}

module.exports = sequelize
