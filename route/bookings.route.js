const {
  authJwt,
  bookingMiddleware,
  paramsValidator,
} = require("../middleware/index.middleware");
const bookingController = require("../controller/booking.controller");
module.exports = (app) => {
  app.post(
    "/flightApp/ap1/v1/bookings",
    [authJwt.verifyJwt, bookingMiddleware.createBooking],
    bookingController.createBooking
  );
  app.put(
    "/flightApp/ap1/v1/bookings/:id",
    [
      authJwt.verifyJwt,
      paramsValidator.validateBookingId,
      authJwt.isAdminOrOwner,
      bookingMiddleware.cancelBooking,
    ],
    bookingController.cancelBooking
  );
  app.get(
    "/flightApp/ap1/v1/bookings",
    [authJwt.verifyJwt, bookingMiddleware.getAllBooking],
    bookingController.getAllBookings
  );
  app.get(
    "/flightApp/ap1/v1/bookings/:id",
    [authJwt.verifyJwt, bookingMiddleware.getOneBooking],
    bookingController.getOneBooking
  );
};
