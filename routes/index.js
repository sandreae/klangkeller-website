var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all events
router.get('/', event.getEvents, event.processEvents, event.list);

module.exports = router;