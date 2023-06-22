const packJson = require("../../package.json")
const sequelize = require("../utils/Database")

// [GET] ../dev/config
exports.getConfig = (req, res, next) => {
  return res.status(200).json({ packJson })
}

// [GET] ../dev/version
exports.getVersion = (req, res, next) => {
  return res.status(200).json({ "Nps backend": packJson.version })
}

// [GET] ../dev/seq
exports.getSeq = async (req, res, next) => {
  try {
    await sequelize.authenticate()
    console.log("Sequelize connection established")
    res.status(200).json("Sequelize connection established")
    next()
  } catch (error) {
    next(error)
  }
}
