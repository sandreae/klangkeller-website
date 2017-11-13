var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all events
router.get('/', function(req, res) {
  event.list(req, res);
});

module.exports = router;
