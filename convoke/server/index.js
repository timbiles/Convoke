require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
// const session = require('express-session');
const passport = require('passport');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
const port = process.env.SERVER_PORT || 3001;

const strategy = require('./strategy');
const { logout, login, getUser } = require('./controllers/userCtrl');
const {
  getAll,
  createEvent
  // deleteEvent
} = require('./controllers/eventsCtrl');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
  })
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

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(strategy);

// passport.serializeUser((user, done) => {
//   const db = app.get('db');
//   db.users
//     .get_user_by_authid(user.id)
//     .then(response => {
//       if (!response[0]) {
//         db.users
//           .add_user_by_authid([user.displayName, user.id])
//           .then(res => done(null, res[0]))
//           .catch(err => done(err, null));
//       } else {
//         return done(null, response[0]);
//       }
//     })
//     .catch(err => done(err, null));
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

//end-points
app.get('/api/events', getAll);
app.post('/api/events', createEvent);
// app.delete('/api/events/:id', deleteEvent);

// app.get('/login', login);
// app.post('/logout', logout);
// app.get('/api/me', getUser);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
