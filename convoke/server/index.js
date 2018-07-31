require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
const cloudinary = require('cloudinary');
const port = process.env.SERVER_PORT || 3001;

const strategy = require('./strategy');
const {
  logout,
  login,
  getUser,
  updateUserInfo
} = require('./controllers/userCtrl');
const {
  getAll,
  getUserEvents,
  createEvent,
  getEvents,
  addEvent,
  deleteEvent,
  deleteEventById
} = require('./controllers/eventsCtrl');
// const {} = require('./controllers/messageCtrl')

const app = express();
app.use(bodyParser.json());

// const server = require('http').Server(app);
// const io = require('socket.io').listen(server);

// app.get('/chat', function(req, res) {
//   res.sendFile(__durname + '/src/components/Chat/Chat');
// });

// io.sockets.on('connection', function(socket) {
//   socket.emit('news', {hello: 'world'});
//   socket.on('my other event', function (data) {
//     console.log(data)
//   })
// });

// users = [];
// connections = [];

// console.log('server running...');



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

// app.use((req, res, next) => {
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }
//   next();
// });

///cloudinary///
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET
// })

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  const db = app.get('db');
  db.users
    .get_user_by_authid(user.id)
    .then(response => {
      if (!response[0]) {
        db.users
          .add_user_by_authid([user.displayName, user.id])
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

//events end-points
app.get('/api/events', getAll);
app.get('/api/user-events', getUserEvents);
app.get('/api/events/:users_id', getEvents);
app.post('/api/add-event/:events_id/:users_id', addEvent);
app.post('/api/events', createEvent);
app.delete('/api/delete/:events_id/:users_id', deleteEvent);
app.delete('/api/deleteEvent/:users_id/:events_id', deleteEventById);

//user endpoints
app.get('/login', login);
app.get('/logout', logout);
app.get('/api/me', getUser);
app.put('/api/updateUserInfo/:id', updateUserInfo);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
