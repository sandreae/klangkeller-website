var mongoose = require('mongoose');
var Event = require('../models/Event');
var fs = require('fs');
var docuController = {};

docuController.list = function (req, res) {
  events = res.data.events.map((event) => {
    if (
      fs.existsSync('./views/documentation/' + event.klangkellerID + '.ejs')
    ) {
      event.isDocumented = true;
    } else {
      event.isDocumented = false;
    }
    return event;
  });
  const { data, options, content } = res;
  res.render('../views/documentation/documentation', {
    data,
    options,
    content,
  });
};

module.exports = docuController;
