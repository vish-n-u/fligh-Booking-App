const {
  authJwt,
  paramsValidator,
  flightDatesMiddleware,
} = require("../middleware/index.middleware");
const flightDateController = require("../controller/flightDates.controller");
module.exports = (app) => {
  app.post(
    "/flightApp/api/v1/flightDates",
    [
      authJwt.verifyJwt,
      authJwt.isAdminOrFlightAdmin,
      flightDatesMiddleware.singleDate,
    ],
    flightDateController.createSingleFlightDate
  );
  app.post(
    "/flightApp/api/v1/multiFlightDates",
    [
      authJwt.verifyJwt,
      authJwt.isAdminOrFlightAdmin,
      flightDatesMiddleware.multipleDate,
    ],
    flightDateController.createMultipleFlightDate
  );
  app.put(
    "/flightApp/api/v1/FlightDates/:id",
    [
      authJwt.verifyJwt,
      authJwt.isAdminOrFlightAdmin,
      paramsValidator.validateFlightParamId,
      flightDatesMiddleware.update,
    ],
    flightDateController.updateSingleFlightDate
  );
  app.get(
    "/flightApp/api/v1/FlightDates",
    [authJwt.verifyJwt, authJwt.isAdmin],
    flightDateController.findAll
  );
  app.get(
    "/flightApp/api/v1/FlightDates",
    [authJwt.verifyJwt, flightDatesMiddleware.findByQuery],
    flightDateController.findByQuery
  );
};
