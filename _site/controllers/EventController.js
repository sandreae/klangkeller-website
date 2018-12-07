var mongoose = require("mongoose");
var Event = require("../models/Event");
var eventController = {};

// Show list of Events
eventController.list = function(req, res) {
  Event.find({}).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(events)
      res.render("../views/events/index", {events: events, query: req.query});
    }
  });
};

// Create new Event
eventController.create = function(req, res) {
  res.render("../views/events/create");
};

// Save new Event
eventController.save = function(req, res) {
  var event = new Event({
    klangkellerID: req.body.klangkellerID,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    contact: req.body.contact,
    slotNumber: req.body.slotNumber,
    slots: [{slot: 1},{slot: 2},{slot: 3},{slot: 4},{slot: 5},{slot: 6},{slot: 7},{slot: 8}],
    bar: {},
    isFestival: req.body.isFestival
  });
  event.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/events/create");
    } else {
      console.log(event)
      console.log("Successfully created an event.");
      res.redirect("/events?admin=true");
    }
  });
};

// Edit an Event
eventController.edit = function(req, res) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/events/edit", {event: event});
    }
  });
};

// Update an Event
eventController.update = function(req, res) {
  Event.findByIdAndUpdate(req.params.id, { $set: { 
    klangkellerID: req.body.klangkellerID,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    contact: req.body.contact,
    slotNumber: req.body.slotNumber,
    isFestival: req.body.isFestival
  }}, { new: true }, function (err, event) {
    if (err) {
      console.log(err);
      res.render("../views/events/edit", {event: req.body});
    }
    console.log(event)
    res.redirect("/events/");
  });
};

// add a slot
eventController.addSlot = function(req, res) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/events/addslot", {event: event, query: req.query});
    }
  });
};


// add a slot
eventController.addBarDoc = function(req, res) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/events/savebardoc", {event: event, query: req.query});
    }
  });
};

// save bar
eventController.saveDoc = function(req, res) {
  Event.findByIdAndUpdate(req.params.id,
    { $set: {
      "documentation.name": req.body.name,
      "documentation.contact": req.body.contact
    }},
      function(err,doc) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("Documentation updated");
          res.redirect("/events");
        }
    }
  );
};

// save bar
eventController.saveBar = function(req, res) {
  Event.findByIdAndUpdate(req.params.id,
    { $set: {
      "bar.name": req.body.name,
      "bar.contact": req.body.contact
    }},
      function(err,doc) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("Bar updated");
          res.redirect("/events");
        }
    }
  );
};

// save slot
eventController.saveSlot = function(req, res) {
  console.log(req.body)
  Event.findOneAndUpdate(
    { "_id": req.params.id1, "slots._id": req.params.id2 },
    { "$set": {
      "slots.$.title": req.body.title,
      "slots.$.description": req.body.description,
      "slots.$.duration": req.body.duration,
      "slots.$.contact": req.body.contact
    }},
      function(err,doc) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("Slot updated");
          console.log(doc)
          res.redirect("/events");
        }
    }
  );
};

// Delete an Event
eventController.delete = function(req, res) {
  Event.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Event deleted!");
      res.redirect("/events?admin=true");
    }
  });
};

module.exports = eventController;