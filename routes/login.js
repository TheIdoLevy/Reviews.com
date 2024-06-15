const passport = require('passport');
const loginRouter = require('express').Router();
const {login} = require('../contorllers/user');


loginRouter.post('/', passport.authenticate("local", {failureMessage: "Bad credentials. Please try again."}), login);


module.exports = loginRouter;