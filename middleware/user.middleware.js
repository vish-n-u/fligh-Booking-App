const constant = require("../utils/constant");
const { userModel: User } = require("../config/db.config");

exports.getSingleUserDetail = async (req, res, next) => {
  //   console.log("SingleUSer Reached!!!!!!");
  if (req.user.userType == constant.userType.admin) {
    if (req.user.userStatus != constant.userStatus.approved) {
      return res
        .status(401)
        .send("You are currently unauthorized for this request");
    }
    if (!req.params.id) {
      return res.status(400).send("You've to provide a valid userId");
    }
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(400).send("Invalid id provided");
      } else {
        req.uniqueUser = user;
        next();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("internal server err!");
    }
  } else {
    req.uniqueUser = req.user;
    console.log(req.uniqueUser);
    next();
  }
};

exports.update = async (req, res, next) => {
  if (req.user.userType != constant.userType.admin) {
    if (req.user.id !== req.userThroughParams.id) {
      return res
        .status(401)
        .send({ meassage: "You are unauthorrized to make this request" });
    }
    // req.body.email = undefined;
    req.body.userStatus = undefined;
  }
  if (req.body.firstName && req.body.firstName.trim().length < 3) {
    return res
      .status(400)
      .send("You have to provide firstName with atleast 3 char");
  }
  // lastName: req.body.lastName,
  if (req.body.lastName && req.body.lastName.trim().length < 3) {
    return res
      .status(400)
      .send("You have to provide lastName with atleast 3 char");
  }
  // birthDate: req.body.birthDate,

  if (req.body.birthdate) {
    const birthdate = new Date(req.body.birthDate);
    const date = new Date();
    if (date.getFullYear() - birthdate.getFullYear() < 10) {
      return res
        .status(400)
        .send(
          "You have to provide birthDate in 'MM-DD-YYYY' format and you should be older than 10yrs"
        );
    }
  }
  if (req.body.password && !passwordVerification.test(req.body.password)) {
    return res
      .status(400)
      .send(
        "user password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      );
  }
  if (
    req.body.contact &&
    (req.body.contact.length != 10 || !(req.body.contact - 1))
  ) {
    return res.status(400).send("Invalid contact number provided");
  }
  if (req.body.userStatus) {
    if (constant.userStatus[req.body.userStatus.toLowerCase()] == undefined) {
      return res.status(400).send("Invalid userstatus provided");
    }
  }
  next();
  // userType: req.body.userType,
};
