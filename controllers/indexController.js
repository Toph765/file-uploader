const prisma = require('../lib/prisma');
const { connect } = require('../routes/indexRouter');

async function indexGet(req, res) {
    res.render("index", {userId: req.user.id});
};

async function createFolderPost(req, res) {
    const { newFolder } = req.body;
    const { userId } = req.params;

    await prisma.folder.create({
        data: {
            name: newFolder,
            userId: parseInt(userId)
        },
    });

    res.redirect("/home");
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
    logoutGet,
    createFolderPost
}