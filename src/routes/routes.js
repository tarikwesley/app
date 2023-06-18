const controller = require("../controllers/monitors");
const router = require("express").Router();

router.get("/", controller.getAll).post("/", controller.createOne);

module.exports = router;
