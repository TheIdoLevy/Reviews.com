const reviewsRouter = require("express").Router();
const {addReview, deleteReview, getReviewsByUserId, editReview} = require('../contorllers/review');


reviewsRouter.get('/', getReviewsByUserId);
reviewsRouter.post('/', addReview);
reviewsRouter.put('/', editReview);
reviewsRouter.delete('/:reviewToDelete', deleteReview);

module.exports = reviewsRouter;