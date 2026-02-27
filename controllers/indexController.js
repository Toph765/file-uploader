const prisma = require('../lib/prisma');
const { connect } = require('../routes/indexRouter');

async function indexGet(req, res) {
    const folders = await prisma.folder.findMany({
        where: {
            userId: req.user.id,
        }
    })

    const files = await prisma.file.findMany({
        where: {
            userId: req.user.id,
            folderId: null
        }
    })

    res.render("index", {userId: req.user.id, folders, files});
};

async function createFolderPost(req, res) {
    const { newFolder } = req.body;

    await prisma.folder.create({
        data: {
            name: newFolder,
            userId: req.user.id
        },
    });

    res.redirect("/home");
};

async function uploaderGet(req, res) {
    res.render(res.render("upload"));
}

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
    uploaderGet,
    createFolderPost
}