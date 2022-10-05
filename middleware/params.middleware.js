const constant = require("../utils/constant");
const { userModel: User } = require("../config/db.config");

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
