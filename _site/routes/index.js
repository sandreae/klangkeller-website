var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");
var eventType = "KLANGKELLER"

// Get all events
router.get('/', function(req, res) {
  req.app.locals.eventType = eventType
  event.list(req, res);
});

module.exports = router;