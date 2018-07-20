const getAll = (req, res, next) => {
  const db = req.app.get('db');

  db.get_all()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something went wrong!`);
    });
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
  deleteEvent
};
