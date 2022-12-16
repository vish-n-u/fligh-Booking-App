const { bookingModel: Bookings } = require("../config/db.config");
const { bookingStatus, paymentStatus } = require("../utils/constant");
const constant = require("../utils/constant");

exports.makePayment = async (req, res) => {
  const booking = await Bookings.findOne({ where: { id: req.booking.id } });
  if (booking.bookingStatus !== constant.bookingStatus.pending) {
    return res
      .status(400)
      .send(
        "You are no longer allowed to make this request, please try making a new booking"
      );
  }
  booking.bookingStatus = bookingStatus.successful;
  req.paymentIdThroughParams.paymentStatus = paymentStatus.successful;
  await booking.save();
  await req.paymentIdThroughParams.save();
  return res.status(200).send({
    message:
      "You have succesfully booked flight ticket ,  you shall recieve an email shortly",
  });
};
