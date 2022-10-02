// const User = require("../model/user.model");

function insertData() {
  let userData = [
    {
      firstName: "Rishab",
      lastName: "Chedda",
      birthDate: 2000 - 11 - 9,
      password: "Rishab@123",
      emailId: "Rishab@email.com",
      contact: 90000000,
    },
  ];
  return userData;
}
module.exports = {
  insertData,
};
