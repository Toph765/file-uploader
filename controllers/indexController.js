async function indexGet(req, res) {
    res.render("index");
};

async function logoutGet(req, res, next) {
    req.logout(err => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    })
}

module.exports = {
    indexGet,
    logoutGet
}