module.exports = {
  userType: {
    admin: "ADMIN",
    customer: "CUSTOMER",
    flightAdmin: "FLIGHTADMIN",
  },
  userStatus: {
    approved: "APPROVED",
    inProgress: "INPROGRESS",
    pending: "PENDING",
    cancelled: "CANCELLED",
    blackListed: "BLACKLISTED",
  },
  emailVerification: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

  passwordVerification:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/, //
  flightStart: {
    mumbai: "MUMBAI",
    delhi: "DELHI",
    kochi: "KOCHI",
  },
  flightEnd: {
    mumbai: "MUMBAI",
    delhi: "DELHI",
    kochi: "KOCHI",
  },
  flightStatus: {
    upComing: "UP-COMING",
    cancelled: "CANCELLED",
    delayed: "DELAYED",
    inProgress: "IN-PROGRESS",
    completed: "COMPLETED",
  },
  bookingStatus: {
    failed: "FAILED",
    successful: "SUCCESSFUL",
    pending: "PENDING",
    cancelled: "CANCELLED",
  },
  paymentStatus: {
    successful: "SUCCESSFUL",
    unsuccessful: "UNSUCCESSFUL",
  },

  thirtyDays: 30 * 24 * 3600 * 1000,
  necessaryDetails: async (arr) => {
    let response = [];
    arr.forEach((element) => {
      let obj = {
        firstName: element.firstName,
        lastName: element.lastName,
        emailId: element.emailId,
        contact: element.contact,
        userType: element.userType,
        userStatus: element.userStatus,
      };
      response.push(obj);
    });
    return response;
  },
  possibleFLights: (flights) => {
    const arrOfFlights = [];
    for (let x = 0; x < flights.length; x++) {
      let obj = {};
      if (flights[x].noOfSeats - flights[x].noOfBookedSeats <= 0) {
        continue;
      } else {
        obj.id = flights[x].id;
        obj.pricePerSeat = flights[x].pricePerSeat;
        obj.date = flights[x].date;
        obj.noOfSeatsLeft = flights[x].noOfSeats - flights[x].noOfBookedSeats;
        obj.flightId = flights[x].flightId;
        arrOfFlights.push(obj);
      }
    }
    return arrOfFlights;
  },
  getDateDiff: (date) => {
    const todaysDate = new Date();
    if (date.getYear() > todaysDate.getYear()) {
      let dateMonth = date.getMonth() + 12 - todaysDate.getMonth();
      if (dateMonth == 1) {
        let ans = date.getDate() + 31 - todaysDate.getDate();
        return ans;
      } else {
        return 5;
      }
    } else if (date.getMonth() > todaysDate.getMonth()) {
      let toBeAdded;
      if (
        todaysDate.getMonth() == 1 ||
        todaysDate.getMonth() == 3 ||
        todaysDate.getMonth() == 5 ||
        todaysDate.getMonth() == 7 ||
        todaysDate.getMonth() == 8 ||
        todaysDate.getMonth() == 10
      )
        toBeAdded = 31;
      if (
        todaysDate.getMonth() == 4 ||
        todaysDate.getMonth() == 6 ||
        todaysDate.getMonth() == 9 ||
        todaysDate.getMonth() == 11
      )
        toBeAdded = 30;
      if (todaysDate.getMonth() == 2) toBeAdded = 28;
      let dateMonth = date.getDate() + toBeAdded - todaysDate.getDate();
      return dateMonth;
    } else if (date.getDate() > todaysDate.getDate()) {
      return date.getDate() - todaysDate.getDate();
    }
  },
};
