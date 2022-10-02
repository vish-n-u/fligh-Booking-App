function otpModel(Sequelize, sequelize) {
  const otp = sequelize.define("OTP", {
    otpNumber: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    userEmailId: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });
  return otp;
}

module.exports = otpModel;
