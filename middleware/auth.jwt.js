const { userModel: User } = require("../config/db.config");

const jwt = require("jsonwebtoken");

exports.validateRefreshToken = async (req, res, next) => {
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
      console.log(decoded, decoded.id);
      const user = await User.findOne({ userId: decoded.id });
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
