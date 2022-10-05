const constant = require("../utils/constant");
const { userStatus, flightStart } = require("../utils/constant");

function userModel(Sequelize, sequelize) {
  const userTable = sequelize.define("users", {
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    emailId: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: Sequelize.DataTypes.BIGINT,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: Sequelize.ENUM(
        constant.userType.admin,
        constant.userType.customer,
        constant.userType.flightAdmin
      ),
      defaultValue: constant.userType.customer,
    },
    userStatus: {
      type: Sequelize.ENUM(
        userStatus.approved,
        userStatus.blackListed,
        userStatus.pending,
        userStatus.inProgress,
        userStatus.cancelled
      ),
      defaultValue: userStatus.approved,
    },
  });
  return userTable;
}
module.exports = userModel;
