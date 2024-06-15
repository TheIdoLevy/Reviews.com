const Queries = require('../model/queries');

const schema = {userId: null, table: 'reviews', id: "", title: "", author: "", date: "", time: "", img: "", rating: null, content: "", subject: ""};
const queries = new Queries(schema);

const reviewMiddleware = {
    getReviewByID(req, res){
        schema.id = req.params.reviewId;
        queries.getDataById().then(d => res.send(d));
    },
    getReviewBySubject(req, res){
        schema.subject = req.params.subject.toLowerCase();
        queries.getDataBySubject().then(d => res.send(d));
    },
    getReviewsByUserId(req, res){
        schema.userId = req.session.passport.user;
        queries.getSpecData().then(d => res.json(d));
    },
    getReviewByTitle(req, res){
        schema.title = req.params.title.toLowerCase();
        queries.getDataByTitle().then(d => res.send(d));
    },
    addReview(req, res){
        const {title, author, img, rating, content, subject} = req.body;
        const date = new Date();
        const dateNow = `${date.getMonth}-${date.getDay}-${date.getFullYear}`;
        const time = `${date.getHours}${date.getSeconds}`;
        schema.userId = req.session.passport.user;
        schema.title = title;
        schema.author = author;
        schema.date = '10-10-10';
        schema.time = '1118';
        schema.img = img;
        schema.rating = rating;
        schema.content = content;
        schema.subject = subject;
        queries.postReview().then(d => res.json(d));
    },
    editReview(req, res){
        const {date, time, img, rating, content, id} = req.body;
        schema.date = date;
        schema.time = time;
        schema.img = img;
        schema.rating = rating;
        schema.content = content;
        schema.id = id;
        queries.editReview().then(d => res.send(d));
    },
    deleteReview(req, res){
        schema.id = req.params.reviewToDelete;
        console.log(schema.id);
        queries.deleteReview().then(d => res.send(d));
    },
};

module.exports = reviewMiddleware;