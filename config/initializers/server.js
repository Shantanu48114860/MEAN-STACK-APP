var express = require('express');
var path = require('path');
var config = require('nconf');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var logger = require('winston');
var app;

var startServer = function (callback) {
    app = express();
    var port = config.get('NODE_PORT');

    app.use(morgan('common'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ type: '*/*' }));
    app.use(express.static(path.join(__dirname + 'public')));

    logger.info('[App] Initializing routes');
    require('../../app/routes/routes')(app);
    app.use(function (err, req, res, next) {
        if (err) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: (app.get('env') === 'development' ? err : {})
            });
            next(err);
        }
    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname.substring(0, 30) + '/a.html');
    });
    app.listen(port);
    logger.info('[App] listening on port' + port);
    if (callback) {
        return callback();
    }
}

module.exports = startServer;