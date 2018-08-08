require('dotenv').config();
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');
const moment = require('moment');

let transporter = nodemailer.createTransport(
  ses({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })
);

const eventEmail = (req, res) => {
  const { name, title, email, date, time } = req.body;

  transporter
    .sendMail({
      from: 'convoke.meet@gmail.com',
      to: email,
      subject: `Thanks for creating your event, ${title} with Convoke!`,
      text: `Hey ${name}! Thank you for using Convoke to create your event, ${title}.\n
      Your event details are listed below.\n \n` +
      moment(date).format('MMM Do, YYYY') + `\n` +
      moment(time).format('h:mm a') + '\n' 
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  eventEmail
};
