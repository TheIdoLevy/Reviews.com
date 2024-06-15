const bcrypt = require('bcrypt');
const {uuid} = require('uuidv4');
const Queries = require('../model/queries');
const pool = require('../model/pool');

const schema = {username: null, password: null, email: null, id: null, table: 'users'};
const queries = new Queries(schema);


const userMiddleware = {
    async registerUser(req, res){
        const {username, password, email} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        schema.username = username;
        schema.password = hashedPassword;
        schema.email = email;
        schema.id = uuid();
        queries.registerUser().then(u => res.send(u));
    },

    async login(req, res){
        schema.id = req.session.passport.user;
        console.log(req.session.passport.user);
        queries.getDataById()
        .then(user => res.send("Successfully logged in!"));
    },

    async logout(req, res){
        await req.session.destroy();
        res.send('Successfully logged out!');
    },
};

module.exports = userMiddleware;
