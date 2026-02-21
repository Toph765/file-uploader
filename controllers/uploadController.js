const prisma = require('../lib/prisma');

async function uploadGet(req, res) {
    const folders = await prisma.folder.findMany({
        where: {
            userId: parseInt(req.params.userId),
        }
    })

    console.log(folders)
    res.render("upload", {userId: req.params.userId, folders});
};

async function uploadPost(req, res) {
    const { folder } = req.body;
    let folderObj = null;

    if (folder !== "None") {
    folderObj = await prisma.folder.findFirst({
        where: {
            name: folder,
            userId: parseInt(req.params.userId),
        },
    });
    }

    const folderId = folderObj.id;

    console.log('folderId: ', folderId);

    await prisma.file.create({
        data: {
            fileName: req.file.originalname,
            fileUrl: `uploads/${req.file.filename}`,
            fileSize: req.file.size,
            userId: parseInt(req.params.userId),
            folderId
        }
    })

    res.redirect("/home");
}

module.exports = {
    uploadGet,
    uploadPost
}