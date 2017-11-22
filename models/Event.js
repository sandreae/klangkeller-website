var mongoose = require('mongoose');

var Slot = new mongoose.Schema({ 
  title: { type: String, default: null },
  description: { type: String, default: null },
  duration: { type: String, default: null },
  contact: { type: String, default: null },
  id: { type: Number, default: null }
});

var Event = new mongoose.Schema({
  klangkellerID: String,
  date: Date,
  time: String,
  venue: String,
  contact: String,
  slots: [Slot],
  documentation: {
    name: String,
    contact: String
  },
  bar: {
  	name: String,
  	contact: String
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', Event);
