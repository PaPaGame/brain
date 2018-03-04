
const Router = require("koa-router");
const userController = require("../controller/CtlUser.js");

const childRouter = new Router();

childRouter.put("/user", userController.Create);
childRouter.post("/user/login", userController.Login);
childRouter.post("/user/exist", userController.Exist);
childRouter.get("/user", userController.Get);
childRouter.delete("/user", userController.Delete);

module.exports = childRouter;