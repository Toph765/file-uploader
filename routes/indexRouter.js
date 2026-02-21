const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const isAuth = require("../lib/authMiddleware").isAuth;

indexRouter.get("/", isAuth, indexController.indexGet);
indexRouter.post("/:userId/new-folder", indexController.createFolderPost);
indexRouter.get("/userId/upload",indexController.uploaderGet);

indexRouter.get("/log-out", indexController.logoutGet);

module.exports = indexRouter;
