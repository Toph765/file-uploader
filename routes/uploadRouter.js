const { Router } = require('express');
const uploadController = require('../controllers/uploadController');
const uploadRouter = Router();
const isAuth = require('../lib/authMiddleware').isAuth;
const upload = require('../controllers/uploadMiddleware');

uploadRouter.get("/:userId", isAuth, uploadController.uploadGet);
uploadRouter.post("/:userId", upload.single("filename"), uploadController.uploadPost);

module.exports = uploadRouter;