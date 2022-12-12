if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const Sequelise = require("sequelize");
console.log(process.env.database, "root", process.env.password);
const sequelize = new Sequelise(
  process.env.database,
  "root",
  process.env.password,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

const userModel = require("../model/user.model")(Sequelise, sequelize);
const otpModel = require("../model/otp.model")(Sequelise, sequelize);
const flightModel = require("../model/flight.model")(Sequelise, sequelize);
const flightDateModel = require("../model/flightDates.model")(
  Sequelise,
  sequelize
);
const bookingModel = require("../model/bookings.model")(Sequelise, sequelize);
const paymentModel = require("../model/payment.model")(Sequelise, sequelize);
const { insertData } = require("../utils/seedData");
async function init() {
  try {
    await sequelize.authenticate();
    await userModel.sync();
    await otpModel.sync({ force: true });
    await flightModel.sync();
    await flightDateModel.sync();
    await bookingModel.sync();
    await paymentModel.sync();
    // await userModel.bulkCreate(insertData());
    console.log("successfully connected");
  } catch (err) {
    console.log(err);
  }
}
init();

module.exports = {
  userModel,
  otpModel,
  flightDateModel,
  flightModel,
  bookingModel,
  paymentModel,
};
