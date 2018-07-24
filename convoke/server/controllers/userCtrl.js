const passport = require('passport');

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3000/login');
  });
};

const login = passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/login'
});

const getUser = (req, res) => {
  if (!req.user) {
    res.status(500).send({ message: 'Not Logged in' });
  } else {
    res.status(200).send(req.user);
  }
};

module.exports = {
  login,
  logout,
  getUser
};
