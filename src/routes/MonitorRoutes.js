const controller = require("../controllers/MonitorController")
const router = require("express").Router()

router.get("/", controller.getAll)
router.post("/status", controller.changeStatus)

module.exports = router
