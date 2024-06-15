const loginRouter = require('./login');
const logoutRouter = require('./logout');
const registerRouter = require('./register');
const reviewsRouter = require('./reviews');
const allReviewsRouter = require('./allReviews');
const userRouter = require('./user');

const mainRouter = {
    loginRouter,
    logoutRouter,
    registerRouter,
    reviewsRouter,
    userRouter,
    allReviewsRouter,
};

module.exports = mainRouter;