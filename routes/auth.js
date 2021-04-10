var express = require('express');
var router = express.Router();
var event = require('../controllers/EventController.js');
var auth = require('../controllers/AuthController.js');

router.get('/login', auth.login);
router.post('/login', auth.loginPost, function (req, res) {
  res.redirect('/events/?signup=true');
});
router.get('/logout', auth.logout);

router.use('/', function (err, req, res, next) {
  const { content } = res;
  console.log(err);
  res.status(500);
  res.render('auth/login', { content, message: err });
});

module.exports = router;
