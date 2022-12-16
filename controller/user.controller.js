const { otpModel: Otp, userModel: User } = require("../config/db.config");
const { necessaryDetails } = require("../utils/constant");

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await User.findAll();
    const response = await necessaryDetails(allUser);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

exports.getOneUserDetails = async (req, res) => {
  try {
    const userDetail = req.uniqueUser;
    const userDetailArr = [userDetail];
    const response = await necessaryDetails(userDetailArr);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

exports.update = async (req, res) => {
  let obj = {
    firstName: req.body.firstName
      ? req.body.firstName
      : req.userThroughParams.firstName,
    lastName: req.body.lastName
      ? req.body.lastName
      : req.userThroughParams.lastName,
    birthDate: req.body.birthDate
      ? req.body.birthDate
      : req.userThroughParams.birthDate,

    contact: req.body.contact
      ? req.body.contact
      : req.userThroughParams.contact,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : req.userThroughParams.password,

    userStatus: req.body.userStatus
      ? req.body.userStatus
      : req.userThroughParams.userStatus,
  };

  try {
    const userDetail = await User.update(obj, { where: { id: req.params.id } });
    const updatedUser = await User.findOne({ where: { id: req.params.id } });
    const response = await necessaryDetails([updatedUser]);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.updateEmail = async (req, res, next) => {};
