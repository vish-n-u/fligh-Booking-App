const {
  paymentModel: Payments,
  bookingModel: Bookings,
  flightDateModel: FlightDate,
} = require("../config/db.config");
const serverConfig = require("../config/server.config");
const constant = require("../utils/constant");
const { bookingStatus } = require("../utils/constant");
exports.createBooking = async (req, res) => {
  let newBooking = {
    flightDateId: req.flightDate.id,
    userId: req.body.userId != undefined ? req.body.userId : req.user.id,
    noOfSeats: req.noOfSeats,
    price: req.price,
    bookingStatus: bookingStatus.pending,
  };
  const booking = await Bookings.create(newBooking);
  
  let newPayment = {
    amount: req.price,
    bookingId: booking.id,
  };

  const payment = await Payments.create(newPayment);
  setTimeout(async () => {
    
    const bookingS = await Bookings.findOne({ where: { id: booking.id } });
    if (bookingS.bookingStatus !== constant.bookingStatus.successful) {
      
      bookingS.bookingStatus = constant.bookingStatus.failed;
      bookingS.noOfBookedSeats = bookingS.noOfBookedSeats - req.noOfSeats;
      await bookingS.save();
    }
  }, 50000);
  res.status(201).send({
    message: "Go to the payment link and pay...",
    price: req.price,
    link: `http://localhost:${serverConfig}/flightApp/ap1/v1/payment/${payment.id}`,
  });
};

exports.cancelBooking = async (req, res) => {
  console.log(4);
  try {
    console.log(req.flightDateDetails);
    req.flightDateDetails.noOfBookedSeats =
      req.flightDateDetails.noOfBookedSeats - req.body.noOfSeats;
    req.flightDateDetails.noOfSeats =
      req.flightDateDetails.noOfSeats + req.body.noOfSeats;
    // req.bookingThroughParams.bookingStatus = bookingStatus.cancelled;
    req.bookingThroughParams.price =
      req.bookingThroughParams.price - req.amount;
    req.bookingThroughParams.noOfSeats =
      req.bookingThroughParams.noOfSeats - req.body.noOfSeats;

    await Promise.all([
      req.bookingThroughParams.save(),
      req.flightDateDetails.save(),
    ]);
    res
      .status(200)
      .send(`SuccessFully updated, you refund amount is ${req.amount}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookingDetails = await Bookings.findAll({
      where: { userId: req.bookingDetails.userId },
    });
    return res.status(200).send(bookingDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server err...");
  }
};
exports.getOneBooking = async (req, res) => {
  try {
    return res.status(200).send(req.bookingThroughParams);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err...");
  }
};
