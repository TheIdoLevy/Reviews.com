const pool = require('./pool');
const {uuid} = require('uuidv4');


class Queries{
    constructor(schema){
        this.schema = schema;
    }

    async registerUser(){
        try{
            await pool.query(`INSERT INTO users VALUES ('${this.schema.id}','${this.schema.email}', '${this.schema.password}', '${this.schema.username}')`);
            return {err: false, res: "Successfully registered! enjoy!"};
        } catch(err){
            return {err: true, msg: err.message}
        }
    }


    async loginUser(){
        try{
            const user = await pool.query(`SELECT * FROM users WHERE id = '${this.schema.id}'`);
            return u.rows[0];
        } catch(err) {
            return err.message;
        }
    }

   async getSpecData(){
        try{
            const data = await pool.query(`SELECT * FROM ${this.schema.table} WHERE user_id = '${this.schema.userId}'`);
            console.log(data.rows);
            return data.rows;
        } catch(err) {
            return err.message;
        };
    }

    async editUserHistory(){
        const {reviews, liked, likes, table, bookmarked} = this.schema;
        console.log(reviews,liked,likes);
        try{
            const data = await pool.query(`SELECT * FROM ${this.schema.table} WHERE user_id = '${this.schema.userId}'`);
            const history = data.rows[0];
            await pool.query(`UPDATE ${table} SET reviews = ${history.reviews + (reviews || 0)}, likes = ${history.likes + (likes || 0)}, liked = ${history.liked + (liked || 0)}, bookmarked='ARRAY ${bookmarked}' WHERE user_id='${this.schema.userId}'`);
            return 'Succesfully Updated!';
        } catch(err) {
            return err.message;
        };
    }

    async getDataById(){
        try{
            const data = await pool.query(`SELECT * FROM ${this.schema.table} WHERE id = '${this.schema.id}'`);
            return data.rows;
        } catch(err) {
            return err.message;
        };
    }

    async postReview(){
        try{
            const {title, author, date, time, img, rating, content, userId, table, subject} = this.schema;
            const reviewId = uuid();
            const res = await pool.query(`INSERT INTO ${table} VALUES ('${reviewId}', '${userId}', '${title}', '${author}', '${date}', '${time}', '${img}', ${rating}, '${content}', '${subject}')`);
            return {err: false, res: "Successfully posted your review!"};
        } catch(err) {
            return {err: true, msg: err.message};
        };
    }

    async deleteReview(){
        console.log("OK");
        try {
            const review = await pool.query(`SELECT * FROM ${this.schema.table} WHERE id = '${this.schema.id}'`);
            console.log(review);
            if(review.rows[0].user_id === this.schema.userId){
                    await pool.query(`DELETE FROM reviews WHERE id = '${this.schema.id}'`);
                    return {err: false, res: `Successfuly deleted you review (id: ${this.schema.id})`};
            };
            console.log("a");
            return {err: true, msg: "Invalid Id"};
        } catch(err) {
            console.log(err.message);
            return {err: true, msg: err.message};
        };
    }

    async editReview(){
        try {
            const {date, time, img, rating, content, userId, table, id} = this.schema;
            const review = await pool.query(`SELECT * FROM ${table} WHERE id = '${id}'`);
            if(review.rows[0].user_id === userId){
                pool.query(`UPDATE ${this.schema.table} SET date = '${date}', time = '${time}', img = '${img}', rating = ${rating}, content = '${content}' WHERE id = '${id}'`);
                return "Successfully updated you review";
            };
            return "Invalid post Id or data";
        } catch(err) {
            return err.message;
        }
    }

    async getDataBySubject(){
        try {
            const response = await pool.query(`SELECT * FROM ${this.schema.table} WHERE LOWER(subject) = '${this.schema.subject}'`);
            return response.rows;
        } catch(err) {
            return {err: true, msg: err.message};
        };
    }

    async getDataByTitle(){
        try{
            const response = await pool.query(`SELECT * FROM ${this.schema.table} WHERE LOWER(title) = '${this.schema.title}'`);
            if(!response.rows[0]) return {err: true, msg: "Review not found"};
            return {err: false, res: response.rows};
        } catch(err) {
            return {err: true, msg: err.message}
        }
    }
};

module.exports = Queries;