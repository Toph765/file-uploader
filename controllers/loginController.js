const passport = require("passport");

async function loginGet(req, res) {
    res.render("login");
};

const loginPost = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/home",
});

module.exports = {
    loginGet,
    loginPost
}