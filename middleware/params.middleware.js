const constant = require("../utils/constant");
const {
  userModel: User,
  flightModel: Flight,
  bookingModel: Booking,
} = require("../config/db.config");
const {
  flightDateModel: FlightDate,
  paymentModel: Payments,
} = require("../config/db.config");


exports.validateParamId = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send("You've to provide id");
  }
  let userId = await User.findOne({ where: { id: req.params.id } });
  if (!userId) {
    return res.status(400).send("invalid user");
  } else {
    req.userThroughParams = userId;
    next();
  }
};
exports.validateFlightParamId = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send("You've to provide id");
  }
  let flightId = await Flight.findOne({ where: { id: req.params.id } });
  if (!flightId) {
    return res.status(400).send("invalid flight id provided");
  } else {
    if (
      req.user.userType == constant.userType.flightAdmin &&
      flightId.flightAdminId !== req.user.id
    ) {
      return res.status(403).send("Invalid request");
    }
    req.flightThroughParams = flightId;
    next();
  }
};

exports.validateFlightDateParamId = async (req, res, next) => {
  if (!req.params.id) return res.status(400).send("Invalid resource location");
  else {
    const validFlightDate = await FlightDate.findOne({
      where: { id: req.params.id },
    });
    if (!validFlightDate) {
      return res.status(400).send("Invalid id provided");
    }
    req.flightDateThroughParams = validFlightDate;
    next();
  }
};

exports.validatePaymentParamId = async (req, res, next) => {
  const paymentIdThroughParams = await Payments.findOne({
    where: { id: req.params.id },
  });
  if (!paymentIdThroughParams) {
    return res.status(400).send("Invalid Param Id provided");
  }

  req.paymentIdThroughParams = paymentIdThroughParams;
  next();
};

exports.validateBookingId = async (req, res, next) => {
  try {
    const bookingThroughParams = await Booking.findOne({
      where: { id: req.params.id },
    });
    if (!bookingThroughParams)
      return res.status(400).send("Invalid booking id provided");

    req.bookingThroughParams = bookingThroughParams;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err...");
  }
};
