const { Router } = require('express');
const uploadController = require('../controllers/uploadController');
const uploadRouter = Router();
const isAuth = require('../lib/authMiddleware').isAuth;

uploadRouter.get("/", isAuth, uploadController.uploadGet);
// uploadRouter.post("/", uploadController.uploadPost);

module.exports = uploadRouter;