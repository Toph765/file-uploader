const prisma = require('../lib/prisma');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

function uploadBuffer(file) {
    let type = "raw";
    let filename = null;
    if (file.mimetype.startsWith("image")) type = "image";
    if (file.mimetype.startsWith("video")) type = "video";

    if (type !== "raw") {
        const extensionIndex = file.originalname.lastIndexOf('.');
        filename = file.originalname.substring(0, extensionIndex) || file.originalname;
    } else {
        filename = file.originalname;
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            public_id: filename,
            unique_filename: false,
            overwrite: true,
            resource_type: type,
            folder: "file_uploader"
        },
        (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        stream.end(file.buffer);
    })
}

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

    const uploadedBuffer = await uploadBuffer(req.file);
    const url = cloudinary.url(uploadedBuffer.public_id, {
        flags: "attachment",
        resource_type: uploadedBuffer.resource_type,
    });

    await prisma.file.create({
        data: {
            fileName: req.file.originalname,
            fileUrl: url,
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