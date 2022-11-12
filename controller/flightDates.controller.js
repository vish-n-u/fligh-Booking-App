const {
  flightDateModel: FlightDate,
  flightModel,
} = require("../config/db.config");
// const flightDate = require("../model/flightDates.model");

exports.createSingleFlightDate = async (req, res) => {
  let obj = {
    date: req.body.date,
    noOfBookedSeats: req.body.noOfBookedSeats,
    noOfSeats: req.flight.noOfSeats,
    pricePerSeat: req.body.pricePerSeat,
    flightId: req.flight.id,
    flightAdminId: req.flight.flightAdminId,
    startPoint: req.flight.startPoint,
    endPoint: req.flight.endPoint,
  };
  try {
    let newFlightDate = await FlightDate.create(obj);
    return res.status(201).send(newFlightDate);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error...");
  }
};

exports.createMultipleFlightDate = async (req, res) => {
  try {
    let newFlightDates = await FlightDate.bulkCreate(req.createFlights);
    if (req.errDates) {
      return res.status(207).send({ newFlightDates, errFlights: req.errDates });
    } else {
      return res.status(201).send({ newFlightDates, errFlights: req.errDates });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error...");
  }
};

exports.updateSingleFlightDate = async (req, res) => {
  try {
    req.flightDateThroughParams.date = req.body.date
      ? req.body.date
      : req.flightDateThroughParams.date;

    req.flightDateThroughParams.noOfBookedSeats = req.body.noOfBookedSeats
      ? req.noOfBookedSeats
      : req.flightDateThroughParams.noOfBookedSeats;
    req.flightDateThroughParams.pricePerSeat = req.body.pricePerSeat
      ? req.body.pricePerSeat
      : req.flightDateThroughParams.pricePerSeat;
    req.flightDateThroughParams.flightAdminId = req.body.flightAdminId
      ? req.body.flightAdminId
      : req.flightDateThroughParams.flightAdminId;

    await req.flightDateThroughParams.save();
    const updatedFlightDate = await FlightDate.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).send(updatedFlightDate);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error...");
  }
};

exports.findAll = async (req, res) => {
  try {
    const resp = await FlightDate.find();
    return res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err....");
  }
};

exports.findByQuery = async (req, res) => {
  try {
    const resp = await FlightDate.findAll({
      where: req.queryObj,
      order: [pricePerSeat, "ASC"],
    });
    return res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err....");
  }
};
