const Queries = require('../model/queries');

const schema = {userId: null, table: 'user_history', reviews: null, likes: null, liked: null, bookmarked: []};
const queries = new Queries(schema);

const userHistoryMiddleware = {
    getUserHistory(req, res){
        schema.userId = req.session.passport.user;
        console.log(schema.userId);
        queries.getSpecData()
        .then(a => res.send(a));
    },
    editUserHistory(req, res){
        schema.userId = req.session.passport.user;
        schema.reviews = req.body.reviews;
        schema.likes = req.body.likes;
        schema.liked = req.body.liked;
        schema.bookmarked = req.body.bookmarked;
        queries.editUserHistory()
        .then(h => res.send(h));
    }
};

module.exports = userHistoryMiddleware;