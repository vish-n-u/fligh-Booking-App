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
};
