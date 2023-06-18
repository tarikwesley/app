const express = require("express");
const sequelize = require("./utils/database");
const Monitor = require("./models/Monitor");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.use("/dev", require("./routes/dev"));
app.use("/monitors", require("./routes/routes"));

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("test success");
    app.listen(process.env.EXTERNAL_PORT || 3333);
  } catch (error) {
    console.error(error);
  }
})();
