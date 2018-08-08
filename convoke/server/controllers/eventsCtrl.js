const getAll = (req, res) => {
  const db = req.app.get('db');

  db.events
    .get_events()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getUserEvents = (req, res) => {
  const db = req.app.get('db');

  db.events
    .get_user_events()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const createEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { title, host, date, time, location, lat, lng, img, description, users_id } = req.body;

  db.events
    .create_event([title, host, date, time, location, lat, lng, img, description, users_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getEvents = (req, res, next) => {
  const db = req.app.get('db');
  const { users_id } = req.params;

  db.events
    .get_event_by_user_id([users_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const addEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { events_id, users_id } = req.params;

  //  CHECK IF USER IS ALREADY SUBSCRIBED TO EVENT

  db.events
    .is_user_subscribed([events_id, users_id])
    .then(response => {
      if (response.length !== 0) {
        res.status(403).send({ message: 'already subscribed' });
      } else {
        db.events
          .add_event_by_events_id([events_id, users_id])
          .then(response => {
            res.status(200).send(response);
          });
      }
    })
    .catch(err => {
      console.log('YOOOO!!', err);
      res.status(500).send(err);
    });
};

const deleteEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { users_id, events_id } = req.params;

  db.events
    .delete_event([users_id, events_id])
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const deleteEventById = (req, res, next) => {
  const db = req.app.get('db');
  const { users_id, events_id } = req.params;

  db.events
    .delete_event_by_users_id([users_id, events_id])
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const updateEventInfo = (req, res) => {
  const db = req.app.get('db');
  const { events_id, title, host, date, time, description } = req.body;

  db.events
    .edit_event_by_events_id([events_id, title, host, date, time, description])
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
};

const deleteOldEvents = (req, res) => {
  const db = req.app.get('db');

  db.events
  .delete_old_events()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}

const getEvent = (res, req) => {
  const db = req.app.get('db');
  const { events_id } = req.params;  

  db.events.get_event_by_events_id([events_id])
  .then(response => {
    res.status(200).send(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}

module.exports = {
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
};
