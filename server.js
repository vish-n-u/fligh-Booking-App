const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serverConfig = require("./config/server.config");

app.get("/", (req, res) => {
  console.log("Reached");
  res.status(200).send("Hello World!");
});
require("./route/auth.route")(app);
require("./route/user.route")(app);
require("./route/flight.route")(app);
require("./route/flightDates.route")(app);
app.listen(serverConfig, (req, res) => {
  console.log("SuccessFully reached");
});
