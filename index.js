var server = require('./config/initializers/server');
var logger = require('winston');
var config = require('nconf');
var async = require('async');
var dotenv = require('dotenv');

dotenv.load();
config.use('memory');
config.argv();
config.env();

async.series([
    function invokeServer(callback) {
        server(callback);
    }
], function (err) {
    if (err) {
        logger.info('[App] Error in connection');
    }
    else {
        logger.info('[App] initiated SUCCESSFULLY');
    }
});