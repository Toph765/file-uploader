const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const isAuth = require("../lib/authMiddleware").isAuth;

indexRouter.get("/", isAuth, indexController.indexGet);
indexRouter.post("/:userId/upload", indexController.createFolderPost);

indexRouter.get("/log-out", indexController.logoutGet);

module.exports = indexRouter;
