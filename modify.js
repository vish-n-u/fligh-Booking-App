async function validateDate(date) {
  const newFlightDate = new Date(date);
  const currDate = new Date();
  try {
    const ifFlightExistsOnNewFlightDate = await FlightDate.findOne({
      where: { date: newFlightDate, flightId: flight.id },
    });
    if (ifFlightExistsOnNewFlightDate) {
      return res
        .status(400)
        .send(
          "This flight already exists on this date, to make any changes pleaase use update"
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err");
  }
  if (
    currDate.getDate() >= newFlightDate.getDate() ||
    newFlightDate.valueOf() > currDate.valueOf() + 30 * 24 * 3600 * 1000
  ) {
    return res
      .status(400)
      .send(
        "Invalid date provided it has to be atleast tomorows date or less than a month's date"
      );
  }
}


// const newFlightDate = new Date(x.date);
// const currDate = new Date();
// try {
//   const ifFlightExistsOnNewFlightDate = await FlightDate.findOne({
//     where: { date: newFlightDate, flightId: flight.id },
//   });
//   if (ifFlightExistsOnNewFlightDate) {
//     let obj = {
//       x,
//       err: "This flight already exists on this date, to make any changes pleaase use update",
//     };
//     errDates.push(obj);
//     continue;
//   }
// } catch (err) {
//   console.log(err);
//   let obj = {
//     x,
//     err: "some err occured, please try adding this date and detail",
//   };
//   errDates.push(obj);
//   continue;
// }
// if (
//   !newFlightDate ||
//   currDate.getDate() >= newFlightDate.getDate() ||
//   newFlightDate.valueOf() > currDate.valueOf() + constant.thirtyDays
// ) {
//   let obj = {
//     x,
//     err: "Invalid Date has been provided,Invalid date provided it has to be atleast tomorows date or less than a month's date",
//   };
//   errDates.push(obj);
//   continue;
// }