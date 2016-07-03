var mongoDb = require('mongodb');
var Server = mongoDb.Server,
    Db = mongoDb.Db,
    BSON = mongoDb.BSONPure;
var logger = require('winston');

module.exports = function (callback) {
    var server = new Server('localhost', 27017, { auto_reconnect: true }),
        db = new Db('Shantanu', server);
    db.open(function (err, db) {
        if (!err) {
            logger.info('[App] Connected to Database');
            db.collection('userLists', { strict: true }, function (err, collection) {
                if (err) {
                    logger.error('[App] Collection does not exist!!');
                }
            });
        }
    });
    callback(null,db);
    //return db;
}