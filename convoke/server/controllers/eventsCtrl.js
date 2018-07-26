const getAll = (req, res) => {
  const db = req.app.get('db');

  db.get_events()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something went wrong!`);
    });
};

const createEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { title, host, date, time, location, img } = req.body;
  // console.log(req.body);

  db.create_event([title, host, date, time, location, img])
    .then(() => {
      res.status(200).send('Sweet');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });
};

const getEvents = (req, res, next) => {
  const db = req.app.get('db');
  const { users_id } = req.params;
  // console.log('hope this works: ', users_id);

  db.get_event_by_user_id([users_id])
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
      console.log(`Something is wrong!!!`);
    });
};

const addEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { events_id, users_id } = req.params;
  // console.log('PARAMS TIM!!!!', req.params);
  db.add_event_by_events_id([events_id, users_id])
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);

      console.log(`yoooooooo, error`);
      res.status(500).send(err);
    });
};

const deleteEvent = (req, res, next) => {
  const db = req.app.get('db');
  // const {user_id, id} = req.params
  // console.log(req.params.events_id);

  db.delete_event([req.params.users_id, req.params.events_id])
    .then(() => res.status(200).send('Sweet'))
    .catch(err => {
      console.log(err);

      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });
};

module.exports = {
  getAll,
  createEvent,
  getEvents,
  addEvent,
  deleteEvent
};
