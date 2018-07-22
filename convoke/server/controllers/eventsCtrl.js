const getAll = (req, res) => {
  const db = req.app.get('db');

  db.get_all()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const createEvent = (req, res, next) => {
  const db = req.app.get('db');
  const { title, host, date, time } = req.body;
  // console.log(req.body);

  db.create_event([ title, host, date, time ])
    .then(() => {
      res.status(200).send('Sweet');
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });

  db.create_listing;
};

const deleteEvent = (req, res, next) => {
  const db = req.app.get('db');

  db.delete_event(req.params.id)
    .then(() => res.status(200).send('Sweet'))
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });
};

module.exports = {
  getAll,
  createEvent,
  deleteEvent
};
