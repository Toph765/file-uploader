const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const isAuth = require("../lib/authMiddleware").isAuth;

indexRouter.get("/", isAuth, indexController.indexGet);
indexRouter.post("/new-folder", indexController.createFolderPost);
indexRouter.get("/upload",indexController.uploaderGet);

indexRouter.get("/log-out", indexController.logoutGet);

module.exports = indexRouter;
