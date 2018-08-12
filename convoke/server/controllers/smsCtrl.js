require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const textMessage = (req, res) => {
  let { name, title, senderName } = req.body;
  // console.log(message);
  client.messages
    .create({
      body: `Hey ${name}You have been invited by ${senderName} to join a convoke event, ${title}! Click the following link to see details!`,
      to: process.env.TWILIO_TO_NUMBER,
      from: process.env.TWILIO_FROM_NUMBER
    })
    .then(message => console.log(message))
    .done();
};

module.exports = {
  textMessage
};
