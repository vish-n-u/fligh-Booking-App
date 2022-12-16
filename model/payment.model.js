const { paymentStatus } = require("../utils/constant");

module.exports = (Sequelize, sequelize) => {
  const paymentModel = sequelize.define("Payments", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    paymentStatus: {
      type: Sequelize.DataTypes.ENUM([
        paymentStatus.successful,
        paymentStatus.unsuccessful,
      ]),
      defaultValue: paymentStatus.unsuccessful,
    },
    bookingId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return paymentModel;
};
