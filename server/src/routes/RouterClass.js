import Router from "koa-router";
import { ClassController } from "../controller/index";

const childRouter = new Router();

// 注册路由
childRouter.post("/class", ClassController.Create);
childRouter.get("/class/:name", ClassController.Get);
childRouter.get("/class", ClassController.Get);
childRouter.put("/class", ClassController.Update);
childRouter.delete("/class", ClassController.Delete);
childRouter.post("/class/fuzzyGroup", ClassController.GetFuzzyGroups);

module.exports = childRouter;