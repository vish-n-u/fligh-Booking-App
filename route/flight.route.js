const {
  authJwt,
  flightValidator,
  paramsValidator,
} = require("../middleware/index.middleware");
const flightController = require("../controller/flight.controller");

module.exports = (app) => {
  app.post(
    "/flightApp/api/v1/flights",
    [authJwt.verifyJwt, authJwt.isAdminOrFlightAdmin, flightValidator.create],
    flightController.create
  );
  app.post(
    "/flightApp/api/v1/flights/:id",
    [
      authJwt.verifyJwt,
      authJwt.isAdminOrFlightAdmin,
      paramsValidator.validateFlightParamId,
      flightValidator.update,
    ],
    flightController.update
  );
  app.get(
    "/flightApp/api/v1/flights/:id",
    [
      authJwt.verifyJwt,
      authJwt.isAdminOrFlightAdmin,
      paramsValidator.validateFlightParamId,
    ],
    flightController.findSingleFlight
  );
  app.get(
    "/flightApp/api/v1/flights",
    [authJwt.verifyJwt, authJwt.isAdmin],
    flightController.findAllFlights
  );
};
