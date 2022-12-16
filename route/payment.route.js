const {
  authJwt,
  paramsValidator,
  paymentMiddleware,
} = require("../middleware/index.middleware");
const paymentController = require("../controller/payment.controller");
module.exports = (app) => {
  app.put(
    "/flightApp/ap1/v1/payment/:id",
    [
      authJwt.verifyJwt,
      paramsValidator.validatePaymentParamId,
      paymentMiddleware.makePayment,
    ],
    paymentController.makePayment
  );
};
