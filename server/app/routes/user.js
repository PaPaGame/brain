const Router = require("koa-router");
const UserController = require("../../controller/userController.js");

const childRouter = new Router();

childRouter.post("/login", UserController.Login);
childRouter.post("/regist", UserController.Regist)

module.exports = childRouter;