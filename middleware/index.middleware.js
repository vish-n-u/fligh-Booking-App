const authMiddleware = require("./auth.middleware");
const authJwt = require("./auth.jwt");
const userMiddleware = require("./user.middleware");
const paramsValidator = require("./params.middleware");
const flightValidator = require("./flight.middleware");

module.exports = {
  authMiddleware,
  authJwt,
  userMiddleware,
  paramsValidator,
  flightValidator,
};
