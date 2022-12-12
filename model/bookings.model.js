const { bookingStatus } = require("../utils/constant");

module.exports = (Sequelize, sequelize) => {
  const bookingModel = sequelize.define("bookings", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    flightDateId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    noOfSeats: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    bookingStatus: {
      type: Sequelize.ENUM(
        // bookingStatus.cancelled,
        bookingStatus.successful,
        bookingStatus.pending,
        bookingStatus.failed,
        bookingStatus.cancelled
        // bookingStatus.
      ),
      defaultValue: bookingStatus.successful,
    },
  });
  return bookingModel;
};
