const registerRouter = require('express').Router();
const {registerUser} = require('../contorllers/user');

registerRouter.post('/', registerUser);

module.exports = registerRouter;