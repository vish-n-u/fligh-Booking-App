const {
  flightDateModel: FlightDate,
  flightModel: Flight,
} = require("../config/db.config");
const { flightStart, flightEnd } = require("../utils/constant");
const constant = require("../utils/constant");
const dateValidation = require("validate-date");

exports.singleDate = async (req, res, next) => {
  const flight = await Flight.findOne({ where: { id: req.body.flightId } });
  if (
    req.user.userType == constant.userType.flightAdmin &&
    req.user.id != flight.flightAdminId
  ) {
    return res.status(403).send("Unauthorized request");
  }
  if (
    !req.body.date ||
    !dateValidation(req.body.date, "boolean", "yyyy-mm-dd")
  ) {
    return res
      .status(400)
      .send(
        "You've to provide the date on which you want to create a flight available,format 'YYYY-MM-DD'"
      );
  }
  const newFlightDate = new Date(req.body.date);
  const currDate = new Date();
  try {
    const ifFlightExistsOnNewFlightDate = await FlightDate.findOne({
      where: { date: newFlightDate, flightId: flight.id },
    });
    if (ifFlightExistsOnNewFlightDate) {
      return res
        .status(400)
        .send(
          "This flight already exists on this date, to make any changes pleaase use update"
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err");
  }
  if (
    currDate.getDate() >= newFlightDate.getDate() ||
    newFlightDate.valueOf() > currDate.valueOf() + 30 * 24 * 3600 * 1000
  ) {
    return res
      .status(400)
      .send(
        "Invalid date provided it has to be atleast tomorows date or less than a month's date"
      );
  }
  if (req.body.noOfBookedSeats) {
    if (req.body.noOfSeats > flight.noOfSeats || !Number(req.body.noOfSeats)) {
      return res.status(400).send("Invalid number of bookedSeats provided");
    }
  }

  if (!req.body.pricePerSeat || !Number(req.body.pricePerSeat)) {
    return res.status(400).send("Invalid price provided");
  }
  req.flight = flight;
  next();
};

exports.multipleDate = async (req, res, next) => {
  // req.params.flightThroughParams;
  const flight = await Flight.findOne({ where: { id: req.body.flightId } });
  const createDates = [];
  const errDates = [];
  const checkIfFlightDateIsUnique = {};
  if (
    req.user.userType == constant.userType.flightAdmin &&
    req.user.id != flight.flightAdminId
  ) {
    return res.status(403).send("Unauthorized request");
  }
  for (let x of req.body.multipleDate) {
    if (!x.date || !dateValidation(x.date, "boolean", "yyyy-mm-dd")) {
      let obj = {
        x,
        err: "No date has been provided ,provide in format 'YYYY-MM-DD'",
      };
      errDates.push(obj);
      continue;
    }

    const newFlightDate = new Date(x.date);

    const currDate = new Date();
    try {
      if (checkIfFlightDateIsUnique[x.date]) {
        let obj = {
          x,
          err: "This Date has already been provided in this request",
        };
        errDates.push(obj);
        continue;
      }
      checkIfFlightDateIsUnique[x.date] = true;
      let ifFlightExistsOnNewFlightDate = await FlightDate.findOne({
        where: { flightId: flight.id, date: x.date },
      });
      if (ifFlightExistsOnNewFlightDate) {
        let obj = {
          x,
          err: "Flight On this Date already exists",
        };
        errDates.push(obj);
        continue;
      }

      if (
        !newFlightDate ||
        newFlightDate.valueOf() > currDate.valueOf() + constant.thirtyDays
      ) {
        let obj = {
          x,
          err: "Invalid Date has been provided,Invalid date provided it has to be atleast tomorows date or less than a month's date",
        };
        errDates.push(obj);
        continue;
      }
    } catch (err) {
      console.log(err);
      let obj = {
        x,
        err: "some err occured, please try adding this date and detail",
      };
      errDates.push(obj);
      continue;
    }

    if (x.noOfBookedSeats) {
      if (x.noOfBookedSeats > flight.noOfSeats || !Number(x.noOfBookedSeats)) {
        let obj = {
          x,
          err: "Invalid number Of seats provided",
        };
        errDates.push(obj);
        continue;
      }
    }

    if (!x.pricePerSeat || !Number(x.pricePerSeat)) {
      let obj = {
        x,
        err: "invalid price provided",
      };
      errDates.push(obj);
      continue;
    }
    x.startPoint = flight.startPoint;
    x.endPoint = flight.endPoint;
    x.flightId = flight.id;
    x.flightAdminId = flight.flightAdminId;
    x.noOfSeats = flight.noOfSeats;
    createDates.push(x);
  }
  console.log(checkIfFlightDateIsUnique);
  req.createFlights = createDates;
  req.errDates = errDates;
  req.flight = flight;
  next();
};

exports.update = async (req, res, next) => {
  if (
    req.flightDateThroughParams.status == constant.flightStatus.completed ||
    req.flightDateThroughParams.status == constant.flightStatus.inProgress
  ) {
    return res
      .status(400)
      .send(
        "This request is not possible because the flight journey is ongoing or completed "
      );
  }
  if (req.body.flightDate) {
    const updateFlightDate = new Date(req.body.flightDate);
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 1);
    if (
      !updateFlightDate ||
      updateFlightDate.valueOf() < currDate.valueOf() ||
      updateFlightDate.valueOf() > currDate.valueOf() + constant.thirtyDays
    )
      return res.status(400).send("Invalid date provided");
  }
  if (req.body.price && req.body.price < 0) {
    return res.status(400).send("Invalid price provided");
  }
  const flight = await Flight.findOne({
    where: { id: req.flighDateThroughParams.flightId },
  });
  if (
    req.body.noOfBookedSeats &&
    (!req.body.noOfBookedSeats[0] == "+" ||
      !req.body.noOfBookedSeats[0] == "-" ||
      !Number(req.body.noOfBookedSeats))
  ) {
    return res.status(400).send("invalid noOfBookedSeats provided");
  }
  if (req.body.noOfBookedSeats) {
    if (
      req.body.noOfBookedSeats[0] == "+" &&
      req.flighDateThroughParams.noOfBookedSeats + req.body.noOfBookedSeats >
        flight.noOfSeats
    ) {
      return res.status(400).send("These many seats are not available");
    }
    if (
      req.body.noOfBookedSeats[0] == "-" &&
      req.flighDateThroughParams.noOfBookedSeats - req.body.noOfBookedSeats < 0
    ) {
      return res.status(400).send("These many seats are not booked");
    }
    if (
      req.body.noOfBookedSeats > flight.noOfSeats ||
      req.body.noOfBookedSeats < 0
    ) {
      return res.status(400).send("Invalid number of seats provided");
    }
    req.noOfBookedSeats =
      req.body.noOfBookedSeats[0] == "+"
        ? req.flighDateThroughParams.noOfBookedSeats + req.body.noOfBookedSeats
        : req.body.noOfBookedSeats == "-"
        ? req.flighDateThroughParams.noOfBookedSeats - req.body.noOfBookedSeats
        : req.body.noOfBookedSeats;
  }
  if (
    req.body.flightAdminId &&
    flight.flightAdminId != req.body.flightAdminId
  ) {
    return res.status(400).send("Invalid flightAdmin provided");
  }
  next();
};

exports.findByQuery = async (req, res, next) => {
  if (!req.query) {
    return res.status(400).send("Please provide a filter");
  }
  if (
    !req.query.startPoint ||
    flightStart[req.query.startPoint.toLowerCase()] == undefined
  ) {
    return res
      .status(400)
      .send(
        "Provide a valid startPoint of your journey , it can be Mumbai,Kochi,Delhi"
      );
  }
  if (
    !req.query.endPoint ||
    flightEnd[req.query.endPoint.toLowerCase()] == undefined
  ) {
    return res
      .status(400)
      .send(
        "Provide a valid endPoint of your journey , it can be Mumbai,Kochi,Delhi"
      );
  }
  if (req.query.date) {
    if (!dateValidation(req.query.date, "boolean", "YYYY-MM-DD"))
      return res.status(400).send("Provide date in yyyy-mm-dd format ");
    const queryFlightDate = new Date(req.query.date);

    let currDate = new Date();
    if (
      !queryFlightDate ||
      queryFlightDate.valueOf() < currDate.valueOf() ||
      queryFlightDate.valueOf() > currDate.valueOf() + constant.thirtyDays
    ) {
      return res.status(400).send("Invalid date provided");
    }
    req.queryFlightDate = new Date(queryFlightDate.toDateString());
  }

  const day = new Date(req.query.date);
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  const searchDate = new Date(`${year}-${month}-${date}`);
  req.searchDate;

  req.querObj = {
    flightStatus: constant.flightStatus.upComing,
    date: searchDate,
    startPoint: req.query.startPoint,
    endPoint: req.query.endPoint,
    // noOfBookedSeats: noOfSeats - noOfBookedSeats > 0,
  };

  next();
};
