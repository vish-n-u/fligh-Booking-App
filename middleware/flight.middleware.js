const { userModel: User, flightModel: Flight } = require("../config/db.config");
const constants = require("../utils/constant");

exports.create = async (req, res, next) => {
  //name: req.body.name,
  if (req.user.userType == constants.userType.admin) {
    if (!req.body.flightAdminId) {
      return res.status(400).send("Provide a valid flight-admin Id");
    }
    const flightAdmin = await User.findOne({
      where: { id: req.body.flightAdminId },
    });
    if (
      flightAdmin.userType !== constants.userType.flightAdmin ||
      flightAdmin.userStatus !== constants.userStatus.approved
    ) {
      return res.status(400).send("Invalid userId provided!!!!");
    }
    req.flightAdmin = flightAdmin;
  }
  if (!req.body.name || req.body.name.trim().length < 5) {
    return res.status(400).send("Internal server err...");
  }
  // noOfSeats: req.body.noOfSeats,
  if (
    !req.body.noOfSeats ||
    req.body.noOfSeats < 10 ||
    req.body.noOfSeats > 1000
  ) {
    return res.status(400).send("Invalid noOfSeats provided!!!");
  }
  //startPoint: req.body.startPoint,
  if (
    !req.body.startPoint ||
    !constants.flightStart[req.body.startPoint.toLowerCase()]
  ) {
    return res.status(400).send("Incorrect startpoint");
  }
  // end: req.body.end,
  if (
    !req.body.endPoint ||
    !constants.flightEnd[req.body.endPoint.toLowerCase()]
  ) {
    return res.status(400).send("Incorrect endPoint");
  }
  req.flightAdmin = req.flightAdmin ? req.flightAdmin : req.user;

  next();
};

exports.update = async (req, res, next) => {
  if (req.user.userType == constants.userType.admin) {
    if (req.body.flightAdminId) {
      console.log(true);
      const flightAdmin = await User.findOne({
        where: { id: req.body.flightAdminId },
      });
      if (
        !flightAdmin ||
        flightAdmin.userType !== constants.userType.flightAdmin ||
        flightAdmin.userStatus !== constants.userStatus.approved
      ) {
        return res.status(400).send("Invalid flightAdminID");
      }
      console.log(flightAdmin);
      req.flightAdmin = flightAdmin;
    }
  }
  // name: req.body.name ? req.body.name : req.flight.name,

  console.log(
    !req.body.name.trim().length > 5 || !req.body.name.trim().length < 16,
    req.body.name.trim().length,
    !req.body.name.trim().length > 5,
    !req.body.name.trim().length < 16
  );
  if (
    req.body.name &&
    (!(req.body.name.trim().length > 5) || !(req.body.name.trim().length < 16))
  ) {
    return res.status(400).send("Invalid name");
  }
  if (
    req.body.noOfSeats &&
    (req.body.noOfSeats < 10 || req.body.noOfSeats > 1000)
  ) {
    return res.status(400).send("Invalid noOfSeats provided!!!");
  }

  // startPoint: req.body.startPoint
  if (
    req.body.startPoint &&
    !constants.flightStart[req.body.startPoint.toLowerCase()]
  ) {
    return res.status(400).send("Incorrect startpoint");
  }
  if (
    req.body.endPoint &&
    !constants.flightEnd[req.body.endPoint.toLowerCase()]
  ) {
    return res.status(400).send("Incorrect startpoint");
  }

  next();
};
