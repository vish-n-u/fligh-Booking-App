if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const nodeClient = require("node-rest-client").Client;
const client = new nodeClient();
let MAIL = process.env.otpMailRoute;
function mailSend(info) {
  let args = {
    data: {
      to: info.to,
      otp: info.otpGenerated,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  client.post(MAIL, args, function (err, response) {
    // parsed response body as js object
    if (err) {
      console.log(err);
    }
    // raw response
    else {
      console.log(response);
    }
  });
}

module.exports = mailSend;
