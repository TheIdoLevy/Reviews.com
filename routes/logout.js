const logoutRouter = require('express').Router();
const {logout} = require('../contorllers/user');


logoutRouter.get('/', logout);

module.exports = logoutRouter;
