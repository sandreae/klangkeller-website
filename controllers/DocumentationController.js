var mongoose = require('mongoose');
var Event = require('../models/Event');
var fs = require('fs');
var docuController = {};

docuController.list = function (req, res) {
  const { data, options, content } = res;
  data.events = data.events.map((event) => {
    const docuPath = `./views/documentation/${res.options.prefix}/${event.klangkellerID}.ejs`;
    if (fs.existsSync(docuPath)) {
      event.documentationPath = `${res.options.prefix}/${event.klangkellerID}.ejs`;
    }
    return event;
  });

  res.render('../views/documentation/documentation', {
    data,
    options,
    content,
  });
};

module.exports = docuController;
