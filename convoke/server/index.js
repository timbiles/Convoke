require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('session');
const massive = require('massive');
// const passport = require('passport');
const path = require('path');
const port = process.env.SERVER_PORT || 3001;

const { getAll, deleteEvent } = require('./controllers/eventsCtrl');

const app = express();
app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => console.log(err));

//end-points
app.get('/api/events', getAll);
app.delete('/api/events/:id', deleteEvent);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
