var express = require('express');
var router = express.Router();
var docu = require('../controllers/DocumentationController.js');
var event = require('../controllers/EventController.js');

router.get('/', event.getAll, event.processEvents, docu.list);

module.exports = router;
