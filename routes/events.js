var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all events
router.get('/', function(req, res) {
  event.list(req, res);
});

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

// Edit update
router.post('/update/:id', function(req, res) {
  event.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  event.delete(req, res);
});

module.exports = router;
