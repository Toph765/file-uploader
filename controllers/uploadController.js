const prisma = require('../lib/prisma');

async function uploadGet(req, res) {
    const folders = await prisma.folder.findMany({
        where: {
            userId: req.user.id,
        }
    })

    res.render("upload", {userId: req.user.id, folders});
};

async function uploadPost(req, res) {
    const { folder } = req.body;
    let folderId = null;

    if (folder !== "none") {
    const folderObj = await prisma.folder.findFirst({
        where: {
            name: folder,
            userId: req.user.id,
        },
    });

    folderId = folderObj.id;
    }

    await prisma.file.create({
        data: {
            fileName: req.file.originalname,
            fileUrl: `uploads/${req.file.filename}`,
            fileSize: req.file.size,
            userId: req.user.id,
            folderId
        }
    })

    res.redirect("/home");
}

module.exports = {
    uploadGet,
    uploadPost
}