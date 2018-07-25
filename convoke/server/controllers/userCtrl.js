const passport = require('passport');

const logout = (req, res) => {
  // console.log('fired')
  req.session.destroy(() => {
    res.redirect('http://localhost:3000');
  });
};

const login = passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/login'
});

const getUser = (req, res) => {
  console.log(req.user)
  if (!req.user) {
    res.status(500).send({ message: 'Not Logged in' });
  } else {
    res.status(200).send(req.user);
  }
};

const updateUserInfo = (req, res) => {
  // console.log(req.body);
  const db = req.app.get('db');
  const { auth_id, name, email, home_town, img, bio } = req.body;

  db.edit_user_by_authid([auth_id, name, email, home_town, img, bio])
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
};

module.exports = {
  login,
  logout,
  getUser,
  updateUserInfo
};
