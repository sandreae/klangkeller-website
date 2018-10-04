var express = require('express');
var router = express.Router();
var docu = require("../controllers/DocumentationController.js");
var eventType = "KLANGKELLER"

router.get('/', function(req, res) {
  req.app.locals.eventType = eventType
  docu.list(req, res);
});

module.exports = router;
