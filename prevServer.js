const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require('./model/pool');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const reviewsRouter = require('./routes/reviews');
const logoutRouter = require('./routes/logout');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const cors = require('cors');
const helmet = require('helmet');
const ensureAuthenticated = require('./utils');

app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: '$%&I^%O*^P(TRDSDFBGNNblvrvh',
    cookie: {maxAge: 1000 * 10, sameSite: 'none'},
    saveUninitialized: false,
    resave: false,
    store,
    httpOnly: true,
}));

// app.use(session({
//     secret: '$%&I^%O*^P(TRDSDFBGNNblvrvh',
//     cookie: {maxAge: 1000 * 10, /* sameSite: 'none' */},
//     saveUninitialized: false,
//     resave: false,
//     store,
//     // httpOnly: true,
// }));



app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done)=>{
    console.log('s');
    done(null, user.id);
});


passport.deserializeUser((id, done)=>{
    console.log('d');
    pool.query(`SELECT * FROM users WHERE id = '${id}'`, (err, user) => {
        if(err) return done(err);
        done(null, user);
    })
});



passport.use( new LocalStrategy(
    function(username, password, done){
        pool.query(`SELECT * FROM users WHERE username = '${username}'`, async (err, user) => {
            if(err) return done(err);
            if(!user.rows[0]) return done(null, false);
            const match = await bcrypt.compare(password, user.rows[0].password);
            if(!match) return done(null, false);
            return done(null, user.rows[0]);
        })
    }
));


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', ensureAuthenticated, userRouter);
app.use('/reviews', ensureAuthenticated, reviewsRouter);
app.use('/logout', logoutRouter);

app.get('/', ensureAuthenticated, (req, res) => {
    pool.query(`SELECT * FROM users`, (err, u) => {
        if(err) res.send(err.message);
        res.json(u.rows);
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('Server started and listening');
});
