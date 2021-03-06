'use strict';

require('dotenv').load({ silent: true });

var logger = require('./lib/logging.js');

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(session({
	store: new RedisStore({ url: process.env.REDIS_URL }),
	secret: 'scrt',
	resave: true,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('./lib/middleware.js'));

app.use('/', require('./routes'));

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
	logger.log('info', 'Node app is running at localhost:' + app.get('port'));
});