const { userModel: User } = require("../config/db.config");
const { refreshKy, secretKy } = require("../config/auth.config");

const jwt = require("jsonwebtoken");
const constant = require("../utils/constant");

exports.verifyJwt = async (req, res, next) => {
  console.log(0);
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    jwt.verify(token, secretKy, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send("Unauthorized user");
      } else {
        console.log("---", decoded.id);
        const user = await User.findOne({ where: { id: decoded.id } });
        console.log(decoded);
        if (!user) {
          return res.status(400).send("Invalid userToken");
        } else if (user.userStatus !== constant.userStatus.approved) {
          return res.status(401).send("Unauthorized!!");
        } else {
          req.user = user;
          next();
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("internal server issue!");
  }
};

exports.verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers["x-access-token"];

  if (!refreshToken) {
    return res.status(400).send("invalid token");
  }
  try {
    jwt.verify(refreshToken, refreshKy, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "UnAuthorised!",
        });
      }
      // console.log(decoded, decoded.id);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(400).send({
          message: "The user that this token belongs to does not exist",
        });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal server error");
  }
};

exports.isAdminOrFlightAdmin = (req, res, next) => {
  if (
    req.user.userType == constant.userType.admin ||
    req.user.userType == constant.userType.flightAdmin
  ) {
    next();
  } else {
    return res.status(401).send("Unauthorized user");
  }
};

exports.isAdmin = async (req, res, next) => {
  if (
    req.user.userType == constant.userType.admin &&
    req.user.userStatus == constant.userStatus.approved
  ) {
    next();
  } else {
    return res.status(401).send({
      message: "Invalid request",
    });
  }
};

exports.isAdminOrOwner = async (req, res, next) => {
  console.log(2);
  if (req.user.userType == constant.userType.admin) {
    console.log(2.5);
    next();
  }
  else if (req.user.id == req.bookingThroughParams.userId) {
    console.log(2.7);
    next();
  } else {
    return res.status(404).send("Unauthorized request");
  }
};
