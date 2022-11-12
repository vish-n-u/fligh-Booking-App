const { flightModel: Flight } = require("../config/db.config");

exports.create = async (req, res) => {
  let obj = {
    name: req.body.name,
    flightAdminId: req.flightAdmin.id,
    noOfSeats: req.body.noOfSeats,
    startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
  };
  try {
    const newFlight = await Flight.create(obj);
    res.status(201).send(newFlight);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal err occured....");
  }
};

exports.update = async (req, res) => {
  try {
    let obj = {
      name: req.body.name ? req.body.name : req.flightThroughParams.name,
      flightAdminId: req.flightAdmin
        ? req.flightAdmin.id
        : req.flightThroughParams.flightAdminId,
      noOfSeats: req.body.noOfSeats
        ? req.body.noOfSeats
        : req.flightThroughParams.noOfSeats,
      startPoint: req.body.startPoint
        ? req.body.startPoint
        : req.flightThroughParams.startPoint,
      endPoint: req.body.endPoint
        ? req.body.endPoint
        : req.flightThroughParams.endPoint,
    };

    const newFlight = await Flight.update(obj, {
      where: { id: req.params.id },
      returning: ["*"],
    });
    const updatedFlight = await Flight.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).send({ newFlight, updatedFlight });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal err occured....");
  }
};

exports.findSingleFlight = async (req, res) => {
  try {
    return res.status(500).send(req.flightThroughParams);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server err");
  }
};

exports.findAllFlights = async (req, res) => {
  try {
    const response = await Flight.find();
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err....");
  }
};
