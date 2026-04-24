const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const isAuth = require("../lib/authMiddleware").isAuth;

indexRouter.get("/", isAuth, indexController.indexGet);
indexRouter.post("/new-folder", indexController.createFolderPost);
indexRouter.get("/upload",indexController.uploaderGet);
indexRouter.get("/:fileId/download", indexController.downloadGet);
indexRouter.get("/library/:folderName", indexController.folderGet);
indexRouter.get("/:folderId/delete-folder", indexController.deleteFolderGet);
indexRouter.get("/:fileId/delete-file", indexController.deleteFileGet);

indexRouter.get("/log-out", indexController.logoutGet);

module.exports = indexRouter;
