require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
const port = process.env.SERVER_PORT || 3001;

const strategy = require('./strategy');
const { logout, login, getUser, updateUserInfo } = require('./controllers/userCtrl');
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 2
    }
  })
);

// const options = {
//   provider: 'google',
//   httpAdapter: 'https',
//   apiKey: process.env.GOOGLE_MAPS_API_KEY,
//   formatter: null
// };

// const geocoder = NodeGeocoder(options);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  const db = app.get('db');
  db.get_user_by_authid(user.id)
    .then(response => {
      console.log(response);
      if (!response[0]) {
        db.add_user_by_authid([user.displayName, user.id])
          .then(res => done(null, res[0]))
          .catch(err => done(err, null));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//create end-points
app.get('/api/events', getAll);
app.post('/api/events', createEvent);
// app.delete('/api/events/:id', deleteEvent);

//user endpoints
app.get('/login', login);
app.get('/logout', logout);
app.get('/api/me', getUser);
app.put('/api/updateUserInfo/:id', updateUserInfo)

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
