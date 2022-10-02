if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const otpGenerator = require("otp-generator");

const { userModel: User, otpModel: Otp } = require("../config/db.config");
const constant = require("../utils/constant");

const otp = () => {
  return otpGenerator.generate(6, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  //   console.log(num);
  //   return num;
};
const verfiedUserData = (newUser, newOtp) =>
  setTimeout(async () => {
    const newUsers = await User.findOne({ where: { id: newUser.id } });
    console.log(newUsers.userStatus, newUser.id);
    if (
      newUsers.userStatus != constant.userStatus.approved &&
      newUsers.userStatus != constant.userStatus.pending
    ) {
      await User.destroy({ where: { id: newUser.id } });
    }
    await Otp.destroy({ where: { id: newOtp.id } });
    await newOtp.save();
  }, 300000);
const otpRoute = process.env.otpRoute;
const secretKy = process.env.secretKey;
const refreshKy = process.env.refreshKey;

module.exports = { otpRoute, secretKy, refreshKy, otp, verfiedUserData };
