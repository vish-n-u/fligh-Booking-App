const cron = require("node-cron");
const { Op, sequelize } = require("sequelize");
const { flightDateModel: FlightDate } = require("../config/db.config");
const constant = require("./constant");

async function flightUpdater() {
  const day = new Date(Date.now());
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  console.log(year, month, date);
  const newDate = new Date(`${year}-${month}-${date}`);
  const lastDate = new Date(`${year}-${month}-${date}`);
  console.log(newDate, lastDate);
  const flightDates = await FlightDate.findAll({
    where: { [Op.or]: [{ date: { [Op.lt]: newDate } }, { date: lastDate }] },
  });
  for (let x = 0; x < flightDates.length; x++) {
    let date = new Date(flightDates[x].date);

    console.log(
      "-----",
      newDate.valueOf() - date.valueOf(),
      flightDates[x].date
    );
    if (newDate.valueOf() - date.valueOf() > 0) {
      console.log(true);
      // flightDates[x].status = constant.flightStatus.completed;
      await FlightDate.update(
        { status: constant.flightStatus.completed },
        { where: { id: flightDates[x].id } }
      );
      console.log(flightDates[x].status);
    } else if (flightDates[x].status == constant.flightStatus.upComing) {
      flightDates[x].status = constant.flightStatus.inProgress;
      await FlightDate.save();
    }
  }
  //   await FlightDate.update();
}
cron.schedule("59 23 * * *", function () {
  flightUpdater();
});

