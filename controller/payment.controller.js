const {
  bookingModel: Bookings,
  flightDateModel: FlightDate,
  flightModel: Flight,
} = require("../config/db.config");
const { bookingStatus, paymentStatus } = require("../utils/constant");
const constant = require("../utils/constant");
const sendMail = require("../config/clientMail.config");

exports.makePayment = async (req, res) => {
  const booking = await Bookings.findOne({ where: { id: req.booking.id } });

  if (!booking) return res.status(400).send("Invalid booking id provided");
  if (booking.bookingStatus !== constant.bookingStatus.pending) {
    return res
      .status(400)
      .send(
        "You are no longer allowed to make this request, please try making a new booking"
      );
  }
  try {
    booking.bookingStatus = bookingStatus.successful;
    req.paymentIdThroughParams.paymentStatus = paymentStatus.successful;
    const resp = await Promise.all([
      booking.save(),
      req.paymentIdThroughParams.save(),
    ]);

    const flightDateDetails = await FlightDate.findOne({
      where: { id: booking.flightDateId },
    });
    const flightDetail = await Flight.findOne({
      where: { id: flightDateDetails.flightId },
    });
    sendMail({
      recipientsEmailId: req.user.emailId,
      subject: "Ticket confirmation",
      content: `You have successfully booked flight in ${flightDetail.name} on ${flightDateDetails.date}, ${booking.noOfSeats} have been booked and the total paid amount was ${booking.price}`,
      requester: "vishnuna26@gmail.com",
    });

    return res.status(200).send({
      message:
        "You have succesfully booked flight ticket ,  you shall recieve an email shortly",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err...");
  }
};
