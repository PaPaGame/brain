
const Router = require("koa-router");
const userController = require("../controller/CtlUser.js");

const childRouter = new Router();

// 注册路由
childRouter.post("/login", userController.Login);

module.exports = childRouter;