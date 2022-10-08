const constant = require("../utils/constant");
const { userModel: User, flightModel: Flight } = require("../config/db.config");

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
