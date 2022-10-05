const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { refreshKy } = require("../config/auth.config");

const { userModel: User, otpModel: Otp } = require("../config/db.config");
const constant = require("../utils/constant");
const { emailVerification, passwordVerification } = constant;

exports.registrationValidation = async (req, res, next) => {
  // firstName: req.body.firstName,

  if (!req.body.firstName || req.body.firstName.trim().length < 3) {
    return res
      .status(400)
      .send("You have to provide firstName with atleast 3 char");
  }

  // lastName: req.body.lastName,
  if (!req.body.lastName || req.body.lastName.trim().length < 3) {
    return res
      .status(400)
      .send("You have to provide lastName with atleast 3 char");
  }
  // birthDate: req.body.birthDate,
  if (!req.body.birthDate) {
    return res
      .status(400)
      .send("You have to provide birthDate in 'MM-DD-YYYY' format");
  }
  const birthdate = new Date(req.body.birthDate);
  const date = new Date();
  if (!birthdate || date.getFullYear() - birthdate.getFullYear() < 10) {
    return res
      .status(400)
      .send(
        "You have to provide birthDate in 'MM-DD-YYYY' format and you should be older than 10yrs"
      );
  }
  // emailId: req.body.emailId,
  if (!req.body.email || !emailVerification.test(req.body.email)) {
    return res.status(400).send("invalid email provided");
  }
  const checkIfOtpIsSent = await Otp.findOne({
    where: { userEmailId: req.body.email },
  });
  if (checkIfOtpIsSent) {
    return res
      .status(400)
      .send(
        "An otp has been already sent, if you havent recieved try again after few minutes"
      );
  }
  const emailExists = await User.findOne({
    where: { emailId: req.body.email },
  });
  if (emailExists) {
    return res
      .status(400)
      .send("User with this emailId already exists please try logging in");
  }
  // contact: req.body.contact,
  if (req.body.contact && req.body.contact != 10) {
    return res.status(400).send("Invalid contact number provided");
  }
  // password: req.body.password,\
  if (!req.body.password || !passwordVerification.test(req.body.password)) {
    return res
      .status(400)
      .send(
        "user password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      );
  }
  // userType: req.body.userType,
  if (
    req.body.userType &&
    constant.userType[req.body.userType.toLowerCase()] != undefined
  ) {
    return res.status(400).send("Invalid userType provided");
  }
  next();
};

exports.otpVerify = async (req, res, next) => {
  if (!req.body.otp) {
    return res.status(400).send("Please provide otp");
  }
  try {
    let userOtp = await Otp.findOne({ where: { otpNumber: req.body.otp } });
    if (!userOtp) {
      return res.status(400).send("otp timed out");
    }
    // console.log(userOtp);
    const user = await User.findOne({
      where: { emailId: userOtp.userEmailId },
    });
    if (!user) {
      return res.status(400).send("Invalid otp");
    }
    // console.log(user);
    if (user.userStatus != constant.userStatus.inProgress) {
      return res.status(408).send("please register again");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server err!");
  }
};

exports.login = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send("Invalid emailID");
  }
  const user = await User.findOne({ where: { emailId: req.body.email } });
  if (!user) {
    return res.status(400).send("Invalid emailID");
  }
  if (
    !req.body.password ||
    bcrypt.compareSync(req.body.password, user.password) == false
  ) {
    return res.status(400).send("Incorrect password");
  }
  req.user = user;
  next();
};
