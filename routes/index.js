var express = require('express');
var router = express.Router();
var events = require('../controllers/EventController.js');
var auth = require('../controllers/AuthController.js');

// Get all events
router.get(
  '/',
  auth.isLoggedIn,
  events.getAll,
  events.processEvents,
  events.showAll,
);

// Forwarders for routes that need query params
router.get('/signup', function (req, res, next) {
  res.redirect('/events/?signup=true');
});
router.get('/admin', function (req, res, next) {
  res.redirect('/events/?admin=true');
});

module.exports = router;
