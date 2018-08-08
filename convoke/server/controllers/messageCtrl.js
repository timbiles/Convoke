const createMessage = (req, res, next) => {
  const db = req.app.get('db');
  const { messages } = req.body;
  const { users_id } = req.params;

  db.messages
    .create_message([messages, users_id])
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getMessages = (req, res) => {
  const db = req.app.get('db');

  db.messages
    .get_messages()
    .then((response) => {
      res.status(200).send(response);
      console.log(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  createMessage,
  getMessages
};
