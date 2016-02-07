var logger = require('../lib/logging.js');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	logger.debug('Rendering the home page')
	res.render('index');
});

module.exports = router;