var mongoose = require('mongoose');
var Event = require('../models/Event');
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
        res.redirect('/events');
      }
    },
  );
};

slotController.saveBar = function (req, res) {
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
        res.redirect('/events');
      }
    },
  );
};

slotController.saveSlot = function (req, res) {
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
        res.redirect('/events');
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
        res.redirect('/events');
      }
    },
  );
};

slotController.addSlotForm = function (req, res) {
  const { data, options, content } = res;
  // slot lengths

  const defaultSlotTimes = data.event.slotLengths;
  const remainingSlotTimes = [];
  const eventSlots = data.event.slots;

  defaultSlotTimes.sort(function (a, b) {
    return b - a;
  });

  // populate remainingSlotTimes with all potential slots
  for (let i = 0; i < data.event.slotNumber; i++) {
    let index = i >= defaultSlotTimes.length ? i : defaultSlotTimes.length - 1;
    remainingSlotTimes.push(defaultSlotTimes[index]);
  }

  // remove already booked slots
  eventSlots.forEach(function (slot) {
    if (slot.duration !== null) {
      const index = remainingSlotTimes.indexOf(slot.duration);
      remainingSlotTimes.splice(index, 1);
    }
  });

  data.event.remainingSlotTimes = remainingSlotTimes;

  res.render('../views/events/addslot', {
    data,
    options,
    content,
    query: req.query,
  });
};

slotController.addExhibitForm = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/addexhibit', { data, options, content });
};

slotController.addBarDocForm = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/savebardoc', {
    data,
    options,
    content,
    query: req.query,
  });
};

module.exports = slotController;
