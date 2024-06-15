const allReviewsRouter = require("express").Router();
const {getReviewByID, getReviewBySubject, getReviewByTitle} = require('../contorllers/review');

allReviewsRouter.get('/:reviewId', getReviewByID);
allReviewsRouter.get('/subject/:subject', getReviewBySubject);
allReviewsRouter.get('/title/:title', getReviewByTitle);

module.exports = allReviewsRouter;