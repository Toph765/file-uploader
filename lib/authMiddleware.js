function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render("index", {message: "Incorrect Username or Password"});
    };
};

module.exports = {
    isAuth
};