const { flightStart, flightEnd } = require("../utils/constant");

function flightModel(Sequelize, sequelize) {
  const flightTable = sequelize.define("flights", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    flightAdminId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    noOfSeats: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    startPoint: {
      type: Sequelize.ENUM(
        flightStart.delhi,
        flightStart.kochi,
        flightStart.mumbai
      ),
      // allowNull: false,
      defaultValue: flightStart.mumbai,
    },

    endPoint: {
      type: Sequelize.ENUM(flightEnd.delhi, flightEnd.mumbai, flightEnd.kochi),
      // allowNull: false,
      defaultValue: flightEnd.mumbai,
    },
  });
  return flightTable;
}

module.exports = flightModel;
