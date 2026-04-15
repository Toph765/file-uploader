const prisma = require('../lib/prisma');
const {format} = require('date-fns');

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

    res.render("index", {userId: req.user.id, folders, files, format});
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

async function downloadGet(req, res) {
    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(req.params.fileId)
        }
    })

    res.redirect(file.fileUrl);
    
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
    createFolderPost,
    downloadGet
}