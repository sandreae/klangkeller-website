var express = require('express');
var router = express.Router();
var event = require('../controllers/EventController.js');
var slot = require('../controllers/SlotController.js');
var auth = require('../controllers/AuthController.js');

// All these routes are protected
router.use(auth.protectedRoute);

router.get('/create', event.create);
router.get('/edit/:id', event.getOne, event.editForm);

router.post('/', event.save);
router.post('/update/:id', event.update);
router.post('/delete/:id', event.delete);

router.get('/performance/:id', event.getOne, slot.performanceSignupForm);
router.get('/exhibit/:id', event.getOne, slot.exhibitionSignupForm);
router.get('/volunteer/:id', event.getOne, slot.volunteerSignupForm);
router.get('/documentation/:id', event.getOne, slot.documentationSignupForm);

router.post('/volunteer/:id', slot.saveVolunteer);
router.post('/exhibit/:id', slot.saveExhibit);
router.post('/documentation/:id', slot.saveDoc);
router.post('/performance/:id1/:id2', slot.savePerformance);

// Forwarders for routes that need query params
router.get('/signup', function (req, res, next) {
  res.redirect('/events/?signup=true');
});
router.get('/admin', function (req, res, next) {
  res.redirect('/events/?admin=true');
});

router.get('/', event.getAll, event.processEvents, event.showAll);

module.exports = router;
