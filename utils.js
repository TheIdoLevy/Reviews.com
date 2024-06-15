function ensureAuthenticated(req, res, done){
    if(req.isAuthenticated()) return done();
    res.json("Please authenticate yourself!");
};

module.exports = ensureAuthenticated;