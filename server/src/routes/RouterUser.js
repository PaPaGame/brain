
const Router = require("koa-router");
const userController = require("../controller/CtlUser.js");

const childRouter = new Router();

childRouter.put("/user", userController.Create);
childRouter.post("/user/login", userController.Login);

module.exports = childRouter;