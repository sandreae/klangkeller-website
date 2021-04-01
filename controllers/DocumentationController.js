var mongoose = require("mongoose");
var Event = require("../models/Event");
var fs = require('fs')
var docuController = {};

// Show list of Events
docuController.list = function(req, res) {
  Event.find({}).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      events = events.map(event => {
        if(fs.existsSync("./views/documentation/" + event.klangkellerID + ".ejs")){
          event.isDocumented = true;
        } else {
          event.isDocumented = false;
        }
        return event
      })
      res.render("../views/documentation/documentation", {events: events});
    }
  });
};

module.exports = docuController;
