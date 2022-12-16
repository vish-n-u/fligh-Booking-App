const {
  flightDateModel: FlightDate,
  userModel: User,
  bookingModel: Booking,
} = require("../config/db.config");
const constant = require("../utils/constant");
const { userType, bookingStatus } = require("../utils/constant");

exports.createBooking = async (req, res, next) => {
  let user;
  if (req.user.userType == userType.admin && req.body.userId != undefined) {
    try {
      user = await User.findOne({ where: { id: req.body.userId } });
      if (!user) return res.status(400).send("Incorrect userId provided");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server errorr...");
    }
  }
  if (!req.body.flightDateId) {
    return res.status(400).send("Provide a valid flighDateId");
  }
  let flightDate;
  try {
    flightDate = await FlightDate.findOne({
      where: { id: req.body.flightDateId },
    });
    if (!flightDate) {
      return res.status(400).send("Invalid flighDateId provided");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server errorr...");
  }

  if (req.body.noOfSeats > 5 || req.body.noOfSeats <= 0) {
    return res.status(400).send("Invalid number of seats provided");
  }
  const noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : 1;

  if (
    flightDate.noOfSeats -
      (Number(flightDate.noOfBookedSeats) + Number(noOfSeats)) <
    0
  ) {
    return res.status(400).send({
      message: "Currently this flight does not have enough seats",
      availableSeats: flightDate.noOfSeats - flightDate.noOfBookedSeats,
    });
  }
  flightDate.noOfBookedSeats =
    Number(flightDate.noOfBookedSeats) + Number(noOfSeats);
  await flightDate.save();
  req.flightDate = flightDate;
  req.price = flightDate.pricePerSeat * noOfSeats;
  req.noOfSeats = noOfSeats;
  // req.userBookingByAdmin = user
  next();
};

exports.cancelBooking = async (req, res, next) => {
  const date = new Date();

  try {
    if (req.bookingThroughParams.bookingStatus != bookingStatus.successful) {
      return res
        .status(400)
        .send("you are not allowed to make changes in this booking");
    }

    await FlightDate.findOne({
      where: { id: req.bookingThroughParams.flightDateId },
    })
      .then((flightDateDetail) => {
        if (flightDateDetail.date <= date) {
          return res
            .status(400)
            .send(
              "The flight is already completed , you cant change ypur booking"
            );
        }
        if (
          req.body.noOfSeats < 0 ||
          req.bookingThroughParams.noOfSeats - req.body.noOfSeats < 0
        ) {
          return res.status(400).send("You cant remove these many seats");
        }

        const flightsDate = new Date(flightDateDetail.date);

        const dateDiff = constant.getDateDiff(flightsDate);
        let returnAmountPercent = dateDiff < 5 ? dateDiff * 10 : 40;
        console.log(returnAmountPercent, dateDiff);
        const amount =
          (flightDateDetail.pricePerSeat *
            returnAmountPercent *
            req.body.noOfSeats) /
          100;
        req.flightDateDetails = flightDateDetail;

        req.amount = amount;

        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Internal server err...");
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err...");
  }
};

exports.getAllBooking = async (req, res, next) => {
  let bookingDetails;
  try {
    if (req.user.userType == userType.admin && req.body.userId != undefined) {
      bookingDetails = await Booking.findOne({
        where: { userId: req.body.userId },
      });
    } else {
      bookingDetails = await Booking.findOne({
        where: { userId: req.user.id },
      });
    }
    if (!bookingDetails)
      return res.status(400).send("Incorrect userId provided");
    req.bookingDetails = bookingDetails;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server err...");
  }
};

exports.getOneBooking = async (req, res, next) => {
  if (req.user.userType == constant.userType.admin) next();
  else if (req.bookingThroughParams.userId == req.user.id) next();
  else if (req.user.userType == constant.userType.flightAdmin) {
    const flightDateDetails = await FlightDate.findOne({
      where: { id: req.bookingThroughParams.flightAdminId },
    });
    if (flightDateDetails.flightAdminId == req.user.id) next();
    else {
      return res.status(404).send("Unauthorized request");
    }
  } else {
    return res.status(404).send("Unauthorized request");
  }
};
