
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');
var index = require('./routes/index');
var events = require('./routes/events');
var documentation = require('./routes/documentation');

var port = process.env.PORT || 3000
var promise = mongoose.connect(process.env.MONGODB_URI  ||  'mongodb://localhost/event', {
  useMongoClient: true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/events', events);
app.use('/documentation', documentation)

app.listen(port, function() {
  console.log('Express server is up and running!');
});
