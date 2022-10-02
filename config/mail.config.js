if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const nodeClient = require("node-rest-client").Client;
const client = new nodeClient();
let MAIL = process.env.clientMailRoute;
function mailSend(data) {
  let args = {
    data: {
      to: data.to,
      otp: data.otpGenerated,
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
