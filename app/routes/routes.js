var express = require('express');
var routes = require('require-dir')();
var changeCase = require('change-case');

module.exports = function (app) {
    Object.keys(routes).forEach(function (routeName) {
        var router = express.Router();
        require('./' + routeName)(router);
        app.use('/api/' + changeCase.paramCase(routeName), router);
    });
}