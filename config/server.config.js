if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
let PORT = process.env.port;

module.exports = PORT;
