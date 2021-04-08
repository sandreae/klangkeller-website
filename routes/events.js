var express = require('express');
var router = express.Router();
var events = require("../controllers/EventController.js");

// Get all events
router.get('/', events.getAll, events.processEvents, events.showAll);
router.get('/create', events.create);
router.get('/edit/:id', events.getOne, events.editForm);
router.get('/addslot/:id', events.getOne, events.addSlotForm);
router.get('/addexhibit/:id', events.getOne, events.addExhibitForm);
router.get('/addbardoc/:id', events.getOne, events.addBarDoc);

router.post('/', events.save);
router.post('/update/:id', events.update);
router.post('/savebar/:id', events.saveBar);
router.post('/saveexhibit/:id', events.saveExhibit);
router.post('/savedoc/:id', events.saveDoc);
router.post('/saveslot/:id1/:id2', events.saveSlot);
router.post('/delete/:id', events.delete);

// Forwarders for routes that need query params
router.get('/signup', function(req, res, next) {res.redirect("/events/?signup=true");});
router.get('/admin', function(req, res, next) {res.redirect("/events/?admin=true");});

module.exports = router;