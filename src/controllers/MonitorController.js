const monitor = require("../models/Monitor")
const mqtt = require("mqtt")

//configurações para comunicação do cliente mqtt com o ttn
const connectOptions = {
  host: "nam1.cloud.thethings.network",
  port: 8883,
  protocol: "mqtts",
  rejectUnauthorized: false,
  username: "appid@ttn",
  password:
    "NNSXS.L7WFJE7PTSEC772INM3BYTJGSCETHU4QOG3ZZBQ.FXCBC64QUTVU7XZGIZZN3CMYH6SHX2PT2GVVK7X2NI4PTJQDK57A",
}

let msg = {}
var payload = {}
let client = mqtt.connect(connectOptions)
client.subscribe("v3/appid@ttn/devices/eui-70b3d57ed00575f8/up")

try {
  client.on("message", async (topic, message) => {
    msg = JSON.parse(message.toString())
    payload = msg.uplink_message.decoded_payload
    console.log("payload: ", payload)

    await monitor
      .create(payload)
      .then((data) => {
        console.log("Ok createOne monitor")
      })
      .catch((error) => {
        console.log("Error in createOne monitor: ", error)
      })
  })
} catch (error) {
  console.log("Error in createOne monitor: ", error)
}

// [GET] ../monitors
exports.getAll = async (req, res, next) => {
  console.log("getAll: [GET] /monitors/")
  try {
    const all = await monitor.findAll()
    return res.status(200).json(all)
  } catch (error) {
    console.log("Error in getAll monitor: ", error)
    return res.status(500).json(error)
  }
}

// [POST] ../monitors/status
exports.changeStatus = async (req, res, next) => {
  console.log("createOne: [POST] /monitors/status/")
  try {
    const changeStatus = { status: req.body.status }
    const jsonString = JSON.stringify(changeStatus)
    try {
      client.publish(
        "v3/appid@ttn/devices/eui-70b3d57ed00575f8/down/push",
        jsonString
      )
      console.log("Ok change status: ", changeStatus)
      return res.status(201).json(changeStatus)
    } catch (error) {
      console.log("Error in change status:", error)
      return res.status(500).json(error)
    }
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}
