if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const nodeMailer = require("node-rest-client").Client;
const nodeClient = new nodeMailer();
const client = process.env.clientMailRoute;
function mailMessage(info) {
  let args = {
    data: {
      recipientsEmailId: info.recipientsEmailId,
      content: info.content,
      subject: info.subject,
      requester: info.requester,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  nodeClient.post(client, args, (err, response) => {
    if (err) {
      console.log(err);
    }
    // raw response
    else {
      console.log(response);
    }
  });
}

module.exports = mailMessage;
