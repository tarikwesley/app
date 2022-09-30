const express = require('express')
const router = express.Router()
const Monitor = require('../models/Monitor')

router.get('/monitor', async (req, res) => {
  const monitor = await Monitor.findAll()
  console.log(monitor)
  return res.json(monitor);
})

router.post('/monitor', async (req, res) => {
  const { corrente, potencia, status } = req.body
  const monitor = await Monitor.create({ corrente, potencia, status })
  return res.json(monitor)
})

router.get('/', (req, res) => {
  return res.json('Hello World!')
})

module.exports = router