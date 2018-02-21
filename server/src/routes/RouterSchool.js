import Router from "koa-router";
import { SchoolController } from "../controller/index";

const childRouter = new Router();

// 注册路由
childRouter.post("/school", SchoolController.Create);
childRouter.get("/school/:code", SchoolController.Get);
childRouter.get("/school", SchoolController.Get);
childRouter.put("/school/:code", SchoolController.Update);
childRouter.delete("/school", SchoolController.Delete);

module.exports = childRouter;