var express = require('express');
var router = express.Router();
var event = require('../controllers/EventController.js');
var slot = require('../controllers/SlotController.js');
var auth = require('../controllers/AuthController.js');

// All these routes are protected
router.use(auth.checkSignIn);

router.get('/', event.getAll, event.processEvents, event.showAll);
router.get('/create', event.create);
router.get('/edit/:id', event.getOne, event.editForm);

router.get('/addslot/:id', event.getOne, slot.addSlotForm);
router.get('/addexhibit/:id', event.getOne, slot.addExhibitForm);
router.get('/addbardoc/:id', event.getOne, slot.addBarDocForm);

router.post('/', event.save);
router.post('/update/:id', event.update);
router.post('/delete/:id', event.delete);

router.post('/savebar/:id', slot.saveBar);
router.post('/saveexhibit/:id', slot.saveExhibit);
router.post('/savedoc/:id', slot.saveDoc);
router.post('/saveslot/:id1/:id2', slot.saveSlot);

// Forwarders for routes that need query params
router.get('/signup', function (req, res, next) {
  res.redirect('/events/?signup=true');
});
router.get('/admin', function (req, res, next) {
  res.redirect('/events/?admin=true');
});

module.exports = router;
