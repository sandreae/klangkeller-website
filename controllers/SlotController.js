var mongoose = require('mongoose');
var Event = require('../models/Event');
var { remainingSlotLengths } = require('../utils/utils');
var slotController = {};

slotController.saveDoc = function (req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        'documentation.name': req.body.name,
        'documentation.contact': req.body.contact,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Documentation updated');
        res.redirect('/');
      }
    },
  );
};

slotController.deleteDoc = function (req, res) {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'documentation.name': null,
        'documentation.contact': null,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Slot deleted');
        res.redirect('/');
      }
    },
  );
};

slotController.saveVolunteer = function (req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        'bar.name': req.body.name,
        'bar.contact': req.body.contact,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Bar updated');
        res.redirect('/');
      }
    },
  );
};

slotController.deleteVolunteer = function (req, res) {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'bar.name': null,
        'bar.contact': null,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Slot deleted');
        res.redirect('/');
      }
    },
  );
};

slotController.savePerformance = function (req, res) {
  Event.findOneAndUpdate(
    { _id: req.params.id1, 'slots._id': req.params.id2 },
    {
      $set: {
        'slots.$.title': req.body.title,
        'slots.$.description': req.body.description,
        'slots.$.duration': req.body.duration,
        'slots.$.contact': req.body.contact,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Slot updated');
        res.redirect('/');
      }
    },
  );
};

slotController.deletePerformance = function (req, res) {
  Event.findOneAndUpdate(
    { _id: req.params.id1, 'slots._id': req.params.id2 },
    {
      $set: {
        'slots.$.title': null,
        'slots.$.description': null,
        'slots.$.duration': null,
        'slots.$.contact': null,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Slot deleted');
        res.redirect('/');
      }
    },
  );
};

slotController.saveExhibit = function (req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        'exhibit.title': req.body.title,
        'exhibit.description': req.body.description,
        'exhibit.contact': req.body.contact,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Exhibit updated');
        res.redirect('/');
      }
    },
  );
};

slotController.deleteExhibit = function (req, res) {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'exhibit.title': null,
        'exhibit.description': null,
        'exhibit.contact': null,
      },
    },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log('Slot deleted');
        res.redirect('/');
      }
    },
  );
};

slotController.performanceSignupForm = function (req, res) {
  const { data, options, content } = res;

  data.event.remainingSlotTimes = remainingSlotLengths(
    data.event.slotLengths,
    data.event.slots,
    data.event.slotNumber,
  );

  res.render('../views/events/form-performance', {
    data,
    options,
    content,
    query: req.query,
  });
};

slotController.exhibitionSignupForm = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/form-exhibit', { data, options, content });
};

slotController.volunteerSignupForm = function (req, res) {
  const { data, options, content } = res;
  console.log('Volunteer form route');
  res.render('../views/events/form-volunteer', {
    data,
    options,
    content,
    query: req.query,
  });
};

slotController.documentationSignupForm = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/form-docu', {
    data,
    options,
    content,
    query: req.query,
  });
};

module.exports = slotController;
