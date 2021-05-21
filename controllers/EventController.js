var mongoose = require('mongoose');
var Event = require('../models/Event');
var {
  generateCountdownMessage,
  filterFutureEvents,
} = require('../utils/utils');
var eventController = {};

eventController.getOne = function (req, res, next) {
  Event.findOne({ _id: req.params.id }).exec(function (err, event) {
    if (err) {
      console.log('Error:', err);
    } else {
      res.data.event = event;
      next();
    }
  });
};

eventController.getAll = function (req, res, next) {
  Event.find({})
    .sort({ date: 'asc' })
    .exec(function (err, events) {
      if (err) {
        console.log('Error:', err);
      } else {
        res.data.events = events;
        next();
      }
    });
};

eventController.create = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/create', { data, options, content });
};

eventController.save = function (req, res) {
  var event = new Event({
    klangkellerID: req.body.klangkellerID,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    contact: req.body.contact,
    exhibit: req.body.exhibit,
    slotNumber: req.body.slotNumber,
    slotLengths: req.options.slotLengths,
    slots: [
      { slot: 1 },
      { slot: 2 },
      { slot: 3 },
      { slot: 4 },
      { slot: 5 },
      { slot: 6 },
      { slot: 7 },
      { slot: 8 },
    ],
    bar: {},
    isFestival: req.body.isFestival,
    hasExhibit: req.body.hasExhibit,
  });
  event.save(function (err) {
    if (err) {
      const { options, content } = res;
      console.log(err);
      res.render('../views/events/create', { options, content });
    } else {
      console.log('Successfully created an event.');
      res.redirect('/events?admin=true');
    }
  });
};

eventController.update = function (req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        klangkellerID: req.body.klangkellerID,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
        contact: req.body.contact,
        slotNumber: req.body.slotNumber,
        isFestival: req.body.isFestival,
        hasExhibit: req.body.hasExhibit,
      },
    },
    { new: true },
    function (err, event) {
      if (err) {
        console.log(err);
        res.render('../views/events/edit', {
          event: req.body,
          options: req.options,
        });
      }
      console.log(event);
      res.redirect('/events/');
    },
  );
};

eventController.delete = function (req, res) {
  Event.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Event deleted!');
      res.redirect('/events?admin=true');
    }
  });
};

eventController.showAll = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/index', {
    data,
    options,
    content,
    query: req.query,
  });
};

eventController.editForm = function (req, res) {
  const { data, options, content } = res;
  res.render('../views/events/edit', { data, options, content });
};

eventController.processEvents = function (req, res, next) {
  // calculate future events
  let futureEvents = filterFutureEvents(res.data.events);

  // generate event countdown
  res.data.futureEvents = futureEvents.map((event) => {
    event.countdown = generateCountdownMessage(
      event,
      new Array(...res.options.signupIntervals),
    );
    return event;
  });
  next();
};

module.exports = eventController;
