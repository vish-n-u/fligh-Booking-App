const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { otp, verfiedUserData } = require("../config/auth.config");
const mailSend = require("../config/mail.config");
const authConfig = require("../config/auth.config");
const { userModel: User, otpModel: Otp } = require("../config/db.config");
const constant = require("../utils/constant");

exports.registration = async (req, res) => {
  // console.log("DATA");
  const otpGenerated = await otp();
  // console.log(otp(), otpGenerated);
  const obj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    emailId: req.body.email,
    contact: req.body.contact,
    password: bcrypt.hashSync(req.body.password, 10),
    userType: req.body.userType,
    userStatus: constant.userStatus.inProgress,
  };

  try {
    const newUser = await User.create(obj);
    const otpDetails = {
      otpNumber: otpGenerated,
      userEmailId: newUser.emailId,
    };
    const newOtp = await Otp.create(otpDetails);
    const emailData = {
      to: req.body.email,
      otpGenerated,
    };
    mailSend(emailData);
    res
      .status(200)
      .send(
        `An otp has been sent to you please enter that on this link ${authConfig.otpRoute}`
      );
    verfiedUserData(newUser, newOtp);
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.otpCheck = async (req, res) => {
  try {
    let validOtp = await Otp.findOne({ where: { otpNumber: req.body.otp } });

    let user = req.user;

    user.userStatus =
      user.userType == constant.userType.customer
        ? constant.userStatus.approved
        : constant.userStatus.pending;
    await Otp.destroy({ where: { id: validOtp.id } });
    await validOtp.save();
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("err");
  }
};

exports.login = async (req, res) => {
  try {
    console.log(authConfig.secretKy);
    const accessToken = jwt.sign({ id: req.user.userId }, authConfig.secretKy, {
      expiresIn: "15m",
    });
    console.log(authConfig.refreshKy);
    const refreshToken = jwt.sign(
      { id: req.user.userId },
      authConfig.refreshKy,
      {
        expiresIn: "5h",
      }
    );

    return res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Internal server error please trya again later");
  }
};

exports.refreshToken = async (req, res) => {
  const accessToken = jwt.sign({ id: req.user.userId }, authConfig.secretKy, {
    expiresIn: "15m",
  });
  try {
    return res.status(200).send(accessToken);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Internal server error please trya again later");
  }
};
