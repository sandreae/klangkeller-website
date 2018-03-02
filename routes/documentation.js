var express = require('express');
var router = express.Router();
var docu = require("../controllers/DocumentationController.js");

router.get('/', function(req, res) {
  docu.list(req, res);
});

module.exports = router;
