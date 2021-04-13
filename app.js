const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md = require('markdown-it')();
const matter = require('gray-matter');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const index = require('./routes/index');
const events = require('./routes/events');
const documentation = require('./routes/documentation');
const auth = require('./routes/auth');

const app = express();
const config = require('config').get('Site');

const DB_URL = config.get('dbString');
const TITLE = config.get('title');
const VENUES = config.get('venues');
const MEMBERS = config.get('organisers');
const CONTENT_PREFIX = config.get('contentPath');
const USER = config.get('user');
const PASSWORD = config.get('password');

var port = process.env.PORT || 3000;
// config.get('dbString') is set via environment variable MONGO_URL
mongoose.connect(DB_URL || 'mongodb://mongo:27017/klangkeller', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'Your secret key' }));
app.use(express.static(path.join(__dirname, 'public')));

const fetchContent = (file) => {
  try {
    return matter.read(`${__dirname}/content/${CONTENT_PREFIX}/${file}.md`)
      .content;
  } catch {
    (err) => {
      return null;
    };
  }
};

app.use((req, res, next) => {
  const content = {
    about: md.render(
      fetchContent('about') ||
        'Please create about.md file, see docs for help.',
    ),
    signup: md.render(
      fetchContent('signup') ||
        'Please create signup.md file, see docs for help.',
    ),
    documentation: md.render(
      fetchContent('documentation') ||
        'Please create documentation.md file, see docs for help.',
    ),
  };
  const options = {
    title: TITLE,
    prefix: CONTENT_PREFIX,
    venues: VENUES,
    members: MEMBERS,
    users: [{ id: USER, password: PASSWORD }],
  };
  res.options = options;
  res.content = content;
  res.data = {};
  next();
});

app.use('/', index);
app.use('/', auth);
app.use('/events', events);
app.use('/documentation', documentation);
app.use('*', index);

app.use('/events', function (err, req, res, next) {
  console.log(err);
  res.redirect('/login');
});

app.listen(port, function () {
  console.log('Express server is up and running!');
});
