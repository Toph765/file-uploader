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
    });

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

async function folderGet(req, res) {
    const folder = await prisma.folder.findFirst({
        where: {
            userId: req.user.id,
            name: req.params.folderName
        }
    })

    const files = await prisma.file.findMany({
        where: {
            folderId: folder.id
        }
    });

    res.render("folder", {files: files, format});
}

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

async function deleteFileGet(req, res) {
    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(req.params.fileId)
        }
    });

    const folderId = file.folderId;
    let folderName = null;

    if (folderId) {
        const folder = await prisma.folder.findUnique({
            where: {
                id: folderId
            }
        });

        folderName = folder.name;
    }

    await prisma.file.delete({
        where: {
            id: parseInt(req.params.fileId),
            userId: req.user.id
        }
    });

    if (folderName) {
        res.redirect(`/home/${folderName}`)
    } else {
        res.redirect("/home");
    }
}

async function deleteFolderGet(req, res) {
    await prisma.folder.delete({
        where: {
            id: parseInt(req.params.folderId),
            userId: req.user.id
        }
    })

    res.redirect("/home")
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
    downloadGet,
    folderGet,
    deleteFileGet,
    deleteFolderGet
}