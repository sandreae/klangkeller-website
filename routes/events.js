var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all events
router.get('/', event.getEvents, event.processEvents, event.list);

// Create event
router.get('/create', function(req, res) {
  event.create(req, res);
});

// Save event
router.post('/save', function(req, res) {
  event.save(req, res);
});

// Edit event
router.get('/edit/:id', function(req, res) {
  event.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  event.update(req, res);
});

// Add slot
router.get('/addslot/:id', function(req, res) {
  event.addSlot(req, res);
});

// Save slot
router.post('/saveslot/:id1/:id2', function(req, res) {
  event.saveSlot(req, res);
});

// Save bar
router.post('/savebar/:id', function(req, res) {
  event.saveBar(req, res);
});

// Save doc
router.post('/savedoc/:id', function(req, res) {
  event.saveDoc(req, res);
});

// Add bar and doc
router.get('/addbardoc/:id', function(req, res) {
  event.addBarDoc(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  event.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  event.delete(req, res);
});

module.exports = router;