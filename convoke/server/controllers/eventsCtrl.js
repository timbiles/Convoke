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
  console.log(req.body);

  db.create_event([ title, host, date, time, location, img ])
    .then(() => {
      res.status(200).send('Sweet');
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(`Something went wrong!!`);
    });

  // db.create_listing;
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
  createEvent
  // deleteEvent
};
