const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const pool = require('./model/pool');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PORT = process.env.PORT || 4001;
const bcrypt = require('bcrypt');
const cors = require('cors');
const r = require('./routes/index');
const ensureAuthenticated = require('./utils');
const helmet = require('helmet');

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 1000 * 60 * 60, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

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

app.use('/login', r.loginRouter);
app.use('/register', r.registerRouter);
app.use('/all/reviews', r.allReviewsRouter);
app.use('/user', ensureAuthenticated, r.userRouter);
app.use('/reviews', ensureAuthenticated, r.reviewsRouter);
app.use('/logout', r.logoutRouter);


app.get('/', (req, res) => {
    console.log(req.isAuthenticated());
    res.send(req.session.passport);
})


app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
