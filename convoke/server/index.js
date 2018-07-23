require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
// const session = require('express-session');
// const passport = require('passport');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
const port = process.env.SERVER_PORT || 3001;

const {
  getAll,
  createEvent
  // deleteEvent
} = require('./controllers/eventsCtrl');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set('db', db))
  .catch(err => console.log(err));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use((req,res,next) => {
//   if(!req.session.)
// })

// const options = {
//   provider: 'google',
//   httpAdapter: 'https',
//   apiKey: process.env.GOOGLE_MAPS_API_KEY,
//   formatter: null
// };

// const geocoder = NodeGeocoder(options);

// massive(process.env.CONNECTION_STRING)
//   .then(db => {
//     app.set('db', db);
//   })
//   .catch(err => console.log(err));

//end-points
app.get('/api/events', getAll);
app.post('/api/events', createEvent);
// app.delete('/api/events/:id', deleteEvent);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
