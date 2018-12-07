var express = require('express');
var router = express.Router();
var event = require("../controllers/RoamingEventController.js");
var eventType = "YADORIGI"


// Get all events
router.get('/', function(req, res) {
  req.app.locals.eventType = eventType
  event.list(req, res);
});

// Create event
router.get('/create', function(req, res) {
  req.app.locals.eventType = eventType
  event.create(req, res);
});

// Save event
router.post('/save', function(req, res) {
  req.app.locals.eventType = eventType
  event.save(req, res);
});

// Edit event
router.get('/edit/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.update(req, res);
});

// Add slot
router.get('/addslot/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.addSlot(req, res);
});

// Save slot
router.post('/saveslot/:id1/:id2', function(req, res) {
  req.app.locals.eventType = eventType
  event.saveSlot(req, res);
});

// Save bar
router.post('/savebar/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.saveBar(req, res);
});

// Save doc
router.post('/savedoc/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.saveDoc(req, res);
});

// Add bar and doc
router.get('/addbardoc/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.addBarDoc(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  req.app.locals.eventType = eventType
  event.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  req.app.locals.eventType = eventType
  event.delete(req, res);
});

module.exports = router;
