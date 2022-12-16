const { bookingModel: Bookings } = require("../config/db.config");
const { userType, bookingStatus } = require("../utils/constant");

exports.makePayment = async (req, res, next) => {
  const booking = await Bookings.findOne({
    where: { id: req.paymentIdThroughParams.bookingId },
  });
  if (booking.userId !== req.user.id && req.user.userType !== userType.admin) {
    return res.status(400).send("Invalid request");
  }
  if (
    !req.body.amount ||
    req.paymentIdThroughParams.amount !== req.body.amount
  ) {
    return res
      .status(400)
      .send(`The amount to be paid is ${req.paymentIdThroughParams.amount}`);
  }
  if (booking.bookingStatus !== bookingStatus.pending) {
    return res
      .status(400)
      .send(
        "You are no longer allowed to make this request, please try making a new booking"
      );
  }
  req.booking = booking;
  next();
};
