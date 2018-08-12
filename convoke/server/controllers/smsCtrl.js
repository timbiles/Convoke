require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const textMessage = (req, res) => {
  let { name, title, senderName } = req.body;
  const url = encodeURIComponent(title.trim())  

  client.messages
    .create({
      body: `Hey ${name}You have been invited by ${senderName} to join a convoke event, ${title}! Click the following link to see details! http://www.convokegroups.com/events/${url}.`,
      to: process.env.TWILIO_TO_NUM,
      from: process.env.TWILIO_FROM_NUM
    })
    .then(message => console.log(message.sid))
    .done();
};

module.exports = {
  textMessage
};
