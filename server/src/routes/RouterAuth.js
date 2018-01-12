import Router from "koa-router";
import { AuthController } from "../controller/index";

const childRouter = new Router();

// 注册路由
childRouter.post("/login", AuthController.SignIn);
childRouter.post("/regist", AuthController.SignUp);

module.exports = childRouter;