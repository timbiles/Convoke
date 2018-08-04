const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

const eventEmail = (req, res) => {

    transporter.sendMail({
        from: 'convoke@gmail.com',
        to: '',
        subject: 'Thanks for creating your event with Convoke!',
        text: 'Something here'
    })
}


module.exports = {
    eventEmail
}