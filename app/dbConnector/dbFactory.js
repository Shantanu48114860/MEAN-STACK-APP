var mongo = require('mongodb');
var logger = require('winston');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
var nconf = require('nconf');
var server = new Server(nconf.get('SERVER'), nconf.get('PORT'), { auto_reconnect: true });
db = new Db('Shantanu', server);

db.open(function (err, db) {
    if (!err) {
        db.collection('userLists', { strict: true }, function (err, collection) {
            if (err) {
                logger.error('[App] Error in connection');
            }
            logger.info('[App] Db connection sucessfull');
        });
    }
});

module.exports = {
    findAll: function (req, res) {
        db.collection('userLists', function (err, collection) {
            if (err) {
                logger.error('Error occured');
            }
            collection.find().toArray(function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            })
        });
    },
    findByItem: function (req, res) {
        db.collection('userLists', function (err, collection) {
            if (err) {
                logger.error('Error occured');
            }
            collection.find({ name: req.params.name }).toArray(function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            })
        });
    },
    insertItem: function (req, res) {
        var users = req.body;
        logger.info('[App] Adding users ' + JSON.stringify(users));
        db.collection('userLists', function (err, collection) {
            if (err) {
                logger.error('Error occured');
            }
            collection.insert(users, { safe: true }, function (err, results) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    logger.info('[App] Successfully inserted: ' + JSON.stringify(results.ops[0]));
                    res.json({message: 'Inserted successfully'});
                }
            });
        })
    }
};

