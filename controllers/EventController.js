var mongoose = require("mongoose");
var Event = require("../models/Event");
var eventController = {};

eventController.getOne = function(req, res, next) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.data.event = event
      next()
    }
  });
};

eventController.getAll = function (req, res, next) {
  Event.find({}).sort({'date': 'asc'}).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.data.events = events
      next();
    }
  });
};

eventController.create = function(req, res) {
  const {data, options, content} = res
  res.render("../views/events/create", {data, options, content});
};

eventController.save = function(req, res) {
  var event = new Event({
    klangkellerID: req.body.klangkellerID,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    contact: req.body.contact,
    exhibit: req.body.exhibit,
    slotNumber: req.body.slotNumber,
    slots: [{slot: 1},{slot: 2},{slot: 3},{slot: 4},{slot: 5},{slot: 6},{slot: 7},{slot: 8}],
    bar: {},
    isFestival: req.body.isFestival,
    hasExhibit: req.body.hasExhibit
  });
  event.save(function(err) {
    if(err) {
      const {options, content} = res
      console.log(err);
      res.render("../views/events/create", {options, content});
    } else {
      console.log(event)
      console.log("Successfully created an event.");
      res.redirect("/events?admin=true");
    }
  });
};

eventController.update = function(req, res) {
  Event.findByIdAndUpdate(req.params.id, { $set: { 
    klangkellerID: req.body.klangkellerID,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    contact: req.body.contact,
    slotNumber: req.body.slotNumber,
    isFestival: req.body.isFestival,
    hasExhibit: req.body.hasExhibit
  }}, { new: true }, function (err, event) {
    if (err) {
      console.log(err);
      res.render("../views/events/edit", {event: req.body});
    }
    console.log(event)
    res.redirect("/events/");
  });
};

// eventController.saveDoc = function(req, res) {
//   Event.findByIdAndUpdate(req.params.id,
//     { $set: {
//       "documentation.name": req.body.name,
//       "documentation.contact": req.body.contact
//     }},
//       function(err,doc) {
//         if(err) {
//           console.log(err);
//         }
//         else {
//           console.log("Documentation updated");
//           res.redirect("/events");
//         }
//     }
//   );
// };

// eventController.saveBar = function(req, res) {
//   Event.findByIdAndUpdate(req.params.id,
//     { $set: {
//       "bar.name": req.body.name,
//       "bar.contact": req.body.contact
//     }},
//       function(err,doc) {
//         if(err) {
//           console.log(err);
//         }
//         else {
//           console.log("Bar updated");
//           res.redirect("/events");
//         }
//     }
//   );
// };

// eventController.saveSlot = function(req, res) {
//   Event.findOneAndUpdate(
//     { "_id": req.params.id1, "slots._id": req.params.id2 },
//     { "$set": {
//       "slots.$.title": req.body.title,
//       "slots.$.description": req.body.description,
//       "slots.$.duration": req.body.duration,
//       "slots.$.contact": req.body.contact
//     }},
//       function(err,doc) {
//         if(err) {
//           console.log(err);
//         }
//         else {
//           console.log("Slot updated");
//           res.redirect("/events");
//         }
//     }
//   );
// };

// eventController.saveExhibit = function(req, res) {
//   Event.findByIdAndUpdate(req.params.id,
//     { $set: {
//       "exhibit.title": req.body.title,
//       "exhibit.description": req.body.description,
//       "exhibit.contact": req.body.contact
//     }},
//       function(err,doc) {
//         if(err) {
//           console.log(err);
//         }
//         else {
//           console.log("Exhibit updated");
//           res.redirect("/events");
//         }
//     }
//   );
// };

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

eventController.showAll = function(req, res) {
  const {data, options, content} = res
  res.render("../views/events/index", {data, options, content, query: req.query});
};

eventController.editForm = function(req, res) {
  const {data, options, content} = res
  res.render("../views/events/edit", {data, options, content});
};

// eventController.addSlotForm = function(req, res) {
//   const {data, options, content} = res
//   res.render("../views/events/addslot", {data, options, content, query: req.query});
// };

// eventController.addExhibitForm = function(req, res) {
//   const {data, options, content} = res
//   res.render("../views/events/addexhibit", {data, options, content});
// };

// eventController.addBarDocForm = function(req, res) {
//     const {data, options, content} = res
//     res.render("../views/events/savebardoc", {data, options, content, query: req.query});
// };

eventController.processEvents = function (req, res, next){
        
  // calculate future events
  const today = new Date()
  const oneDay = 86400000
  const yesterday = new Date(today - (1*oneDay))  

  let futureEvents = res.data.events.filter(event => yesterday.getTime() <= event.date.getTime());
  
  // generate event countdown
  res.data.futureEvents = futureEvents.map(event => {
    event = event.toObject()
    let eventDate = event.date.toDateString()
    let count = 0
    for(var x=0; x < event.slotNumber;x++) {
      if(event.slots[x].title != undefined) {
        count++ 
      }
    }

    Date.prototype.addDays = function(oneDay) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + oneDay);
        return dat;
    }
    
    let message, signupDate
    let countdown = {}
    let slotsLeft = event.slotNumber - count

    const now = new Date()
    eventDate = new Date(eventDate)

    if (slotsLeft >= 3) {signupDate = eventDate.addDays(-32)}
    if (slotsLeft === 2) {signupDate = eventDate.addDays(-7)}
    if (slotsLeft === 1) {signupDate = eventDate.addDays(-1)}

    var mil = signupDate - now 
    var seconds = (mil / 1000) | 0;
    mil -= seconds * 1000;

    var minutes = (seconds / 60) | 0;
    seconds -= minutes * 60;

    var hours = (minutes / 60) | 0;
    minutes -= hours * 60;

    var days = (hours / 24) | 0;
    hours -= days * 24;

    var weeks = (days / 7) | 0;
    days -= weeks * 7; 

    if (slotsLeft === 0){message = "sorry, this event is full"; signupLink = false} else {
        message = "next signup in " + weeks + " weeks, " + days + " days and " + hours + " hours.";
        signupLink = false
    }

    if (mil <= 0) {message = "sign-up now!"; signupLink = true}

    event.countdown = {message, signupLink}

    return event
  })
  next();
};

module.exports = eventController;