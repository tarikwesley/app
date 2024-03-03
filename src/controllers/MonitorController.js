const monitor = require('../models/Monitor')
const mqtt = require('mqtt')

//configurações para comunicação do cliente mqtt com o ttn
const connectOptions = {
  host: 'nam1.cloud.thethings.network',
  port: 8883,
  protocol: 'mqtts',
  rejectUnauthorized: false,
  username: 'appid@ttn',
  password:
    'NNSXS.Y3HSKWKUJKWDEOX5PIFHA53TRBJGLFOJUKCPSVI.4XEO5GX74HUBW6SLQO2TTKENT5AWFG5E6RRLHAYNDAF3CVQ5OPMA',
}

let msg = {}
let payload = {}

let client = mqtt.connect(connectOptions)
client.subscribe('v3/appid@ttn/devices/eui-70b3d57ed00575f8/up')
//escrever sobre mqtt no tcc
try {
  client.on('message', async (topic, message) => {
    msg = JSON.parse(message.toString())
    payload = msg.uplink_message.decoded_payload
    console.log('payload: ', payload)

    await monitor
      .create(payload)
      .then((data) => {
        console.log('Ok createOne monitor')
      })
      .catch((error) => {
        console.log('Error in createOne monitor: ', error)
      })
  })
} catch (error) {
  console.log('Error in createOne monitor: ', error)
}

// function Decoder(bytes, port) {
//   var current = (bytes[0] << 8) + bytes[1]
//   var power = (bytes[2] << 8) + bytes[3]
//   var status = bytes[4]

//   return {
//     current: current / 100.0,
//     power: power,
//     status: status,
//   }
// }

// [GET] ../monitors
exports.getAll = async (req, res, next) => {
  console.log('getAll: [GET] /monitors/')
  try {
    const all = await monitor.findAll()
    return res.status(200).json(all)
  } catch (error) {
    console.log('Error in getAll monitor: ', error)
    return res.status(500).json(error)
  }
}

// [POST] ../monitors/status
exports.changeStatus = async (req, res, next) => {
  console.log('createOne: [POST] /monitors/status/')
  try {
    const changeStatus = { status: req.body.status }
    const jsonString = JSON.stringify(changeStatus)
    try {
      client.publish(
        'v3/appid@ttn/devices/eui-70b3d57ed00575f8/down/push',
        jsonString
      )
      console.log('Ok change status: ', changeStatus)
      return res.status(201).json(changeStatus)
    } catch (error) {
      console.log('Error in change status:', error)
      return res.status(500).json(error)
    }
  } catch (error) {
    return res.status(400).json('Bad Request')
  }
}
