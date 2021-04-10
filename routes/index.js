var express = require('express');
var router = express.Router();
var events = require('../controllers/EventController.js');

// Get all events
router.get('/', events.getAll, events.processEvents, events.showAll);

module.exports = router;
