import Router from "koa-router";
import { SchoolController } from "../controller/index";

const childRouter = new Router();

// 注册路由
childRouter.post("/school", SchoolController.Create);
childRouter.get("/school/:code", SchoolController.Get);
childRouter.get("/school", SchoolController.Get);
childRouter.put("/school", SchoolController.Update);
childRouter.delete("/school", SchoolController.Delete);
childRouter.post("/school/fuzzyList", SchoolController.FuzzyList);

module.exports = childRouter;