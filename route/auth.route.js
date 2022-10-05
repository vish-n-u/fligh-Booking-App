const userController = require("../controller/auth.controller");
const { authMiddleware, authJwt } = require("../middleware/index.middleware");
module.exports = (app) => {
  app.post(
    "/flighBooking/ap1/v1/registration",
    [authMiddleware.registrationValidation],
    userController.registration
  );
  //   app.post("/flightBooking/api/v1/login");
  app.post(
    "/flighBooking/ap1/v1/otp",
    [authMiddleware.otpVerify],
    userController.otpCheck
  );
  app.post(
    "/flighBooking/ap1/v1/login",
    [authMiddleware.login],
    userController.login
  );
  app.get(
    "/flighBooking/ap1/v1/token",
    [authJwt.verifyRefreshToken],
    userController.refreshToken
  );
};
