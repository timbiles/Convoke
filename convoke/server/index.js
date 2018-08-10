require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cloudinary = require('cloudinary');
const socket = require('socket.io');
const port = process.env.SERVER_PORT || 3001;

const strategy = require('./strategy');
const {
  logout,
  login,
  getUser,
  updateUserInfo,
  getAllUsers
} = require('./controllers/userCtrl');
const {
  getAll,
  getUserEvents,
  createEvent,
  getEvents,
  addEvent,
  deleteEvent,
  deleteEventById,
  updateEventInfo,
  deleteOldEvents,
  getEvent
} = require('./controllers/eventsCtrl');
const { createMessage, getMessages } = require('./controllers/messageCtrl');
const { eventEmail, inviteEmail } = require('./controllers/nodeCtrl');
// const { getWeather } = require('./controllers/weatherCtrl');

const app = express();
app.use(bodyParser.json());

console.log(`${__dirname}/../build`)
app.use( express.static( `${__dirname}/../build` ) );


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
app.get('/api/events/:events_id', getEvent)
app.post('/api/add-event/:events_id/:users_id', addEvent);
app.post('/api/events', createEvent);
app.delete('/api/delete/:events_id/:users_id', deleteEvent);
app.delete('/api/deleteEvent/:users_id/:events_id', deleteEventById);
app.put('/api/updateEventInfo/:id', updateEventInfo);
app.delete('/api/deleteOldEvent', deleteOldEvents)

//user endpoints
app.get('/login', login);
app.get('/logout', logout);
app.get('/api/me', getUser);
app.get('/api/users', getAllUsers);
app.put('/api/updateUserInfo/:id', updateUserInfo);

//message endpoints
app.post('/api/message/:users_id', createMessage);
app.get('/api/messages', getMessages);

//node endpoints
app.post('/api/email', eventEmail);
app.post('/api/invite-email', inviteEmail);

// weather endpoints
// app.get('/api/get-weather', getWeather)


//run build
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

server = app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

//// socket io
io = socket(server);

io.on('connection', socket => {
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
