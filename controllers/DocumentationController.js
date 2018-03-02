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
      res.render("../views/documentation/documentation", {events: events, fs: fs});
    }
  });
};

module.exports = docuController;
