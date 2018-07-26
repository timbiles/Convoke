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
      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });
};

const getEvents = (req, res, next) => {
  const db = req.app.get('db');
  const {users_id} = req.params
  console.log(req.body)

  db.get_event_by_user_id([users_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something is wrong!!!`);
    });
};

const addEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { events_id, user_id } = req.params;

  db.add_event_by_events_id([events_id, user_id])
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(`yoooooooo, error`);
      res.status(500).send(err);
    });
};

// const deleteEvent = (req, res, next) => {
//   const db = req.app.get('db');

//   db.delete_event(req.params.id)
//     .then(() => res.status(200).send('Sweet'))
//     .catch(err => {
//       res.status(500).send(err);
//       console.log(`Something went wrong!!`);
//     });
// };

module.exports = {
  getAll,
  createEvent,
  getEvents,
  addEvent
};
