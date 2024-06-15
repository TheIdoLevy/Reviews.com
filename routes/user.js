const userRouter = require('express').Router();
const {getUserHistory, editUserHistory} = require('../contorllers/userHistory');

userRouter.get('/history', getUserHistory);
userRouter.put('/history', editUserHistory);

module.exports = userRouter;