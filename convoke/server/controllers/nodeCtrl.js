require('dotenv').config();
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

let transporter = nodemailer.createTransport(
  ses({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })
);

const eventEmail = (req, res) => {
  const { email, title } = req.body;

  transporter
    .sendMail({
      from: 'convoke.meet@gmail.com',
      to: email,
      subject: `Thanks for creating your event, ${title} with Convoke!`,
      text: 'Something here',
      bcc: 'timbilestimbiles@gmail.com'
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  eventEmail
};
