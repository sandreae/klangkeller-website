
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');
var index = require('./routes/index');
var events = require('./routes/events');
var documentation = require('./routes/documentation');

var config = require('config').get('Site');

const DB_URL=config.get('dbString');
const TITLE=config.get('title');
const VENUES=config.get('venues');
const MEMBERS=config.get('organisers');

var port = process.env.PORT || 3000
// config.get('dbString') is set via environment variable MONGO_URL
mongoose.connect(DB_URL ||  'mongodb://mongo:27017/klangkeller', { useNewUrlParser: true,  useUnifiedTopology: true  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const options = {
    title: TITLE,
    venues: VENUES,
    members: MEMBERS
  }
  res.options = options
  next()
})
app.use('/', index);
app.use('/events', events);
app.use('/documentation', documentation)

app.listen(port, function() {
  console.log('Express server is up and running!');
});
