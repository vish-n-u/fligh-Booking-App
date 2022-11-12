const { flightStatus, flightEnd, flightStart } = require("../utils/constant");

function flightDate(Sequelize, sequelize) {
  const flightDates = sequelize.define("flightDates", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
      // default: Sequelize.DataTypes.NOW,
    },
    noOfSeats: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    noOfBookedSeats: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pricePerSeat: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    flightId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    flightAdminId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.ENUM([
        flightStatus.upComing,
        flightStatus.cancelled,
        flightStatus.delayed,
        flightStatus.inProgress,
      ]),
      defaultValue: flightStatus.upComing,
    },
    startPoint: {
      type: Sequelize.ENUM([
        flightStart.delhi,
        flightStart.kochi,
        flightStart.mumbai,
      ]),
    },
    endPoint: {
      type: Sequelize.ENUM([
        flightEnd.delhi,
        flightEnd.mumbai,
        flightEnd.kochi,
      ]),
    },
  });
  return flightDates;
}
module.exports = flightDate;
