import Router from "koa-router";
import { ClassController } from "../controller/index";

const childRouter = new Router();

// 注册路由
childRouter.post("/class", ClassController.Create);
childRouter.get("/class/:name", ClassController.Get);
childRouter.get("/class/fuzzy/:name", ClassController.FuzzyGet);
childRouter.get("/class", ClassController.Get);
childRouter.put("/class", ClassController.Update);
childRouter.delete("/class", ClassController.Delete);

module.exports = childRouter;