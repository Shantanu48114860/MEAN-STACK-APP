var userRoutes = require('../dbConnector/dbFactory')
module.exports = function (router) {
    router.route('/')
        .get(userRoutes.findAll)
        .post(userRoutes.insertItem);
    
    router.route('/:name')
        .get(userRoutes.findByItem);
}