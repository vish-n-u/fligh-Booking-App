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
};
