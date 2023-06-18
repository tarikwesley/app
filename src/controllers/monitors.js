const Monitor = require("../models/Monitor");

// [GET] ../monitors
exports.getAll = async (req, res, next) => {
  console.log("getAll: [GET] /monitors/");
  try {
    const ALL = await Monitor.findAll();
    console.log(
      "OK getAll MONITOR: ",
      ALL.map((el) => el.dataValues)
    );
    return res.status(200).json(ALL);
  } catch (error) {
    console.log("ERROR in getAll " + "MONITOR:", error);
    return res.status(500).json(error);
  }
};

// [POST] ../monitors
exports.createOne = async (req, res, next) => {
  console.log("createOne: [POST] /monitors/");
  try {
    const MONITOR_MODEL = {
      current: req.body.current,
      power: req.body.power,
      status: req.body.status,
    };

    try {
      const monitor = await Monitor.create(MONITOR_MODEL);
      console.log("OK createOne MONITOR: ", monitor);
      return res.status(201).json(monitor);
    } catch (error) {
      console.log("ERROR in createOne " + "MONITOR:", error);
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(400).json("Bad Request");
  }
};
