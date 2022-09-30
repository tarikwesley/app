const express = require('express')
const app = express()
app.use(express.json())
const router = require('./routes/routes')
app.use(router)
const cors = require('cors')
app.use(cors('*'))
require('./database')
const port = normalizePort(process.env.PORT || "3333")
app.set("port", port)
app.listen(port, () => console.log(`Api rodando na porta ${port}`))

//função para normalização da porta do server. função tirada do gerador de código do express
//verifica se tem alguma porta disponivel no server para rodar a aplicação
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}
