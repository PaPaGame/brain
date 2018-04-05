import Router from "koa-router";
import jwt from "../middleware/jwt";
import { ClassController } from "../controller/index";

const childRouter = new Router({
    prefix: '/class'
});

childRouter.use(jwt({}));
// 注册路由
childRouter.post("", ClassController.Create);
childRouter.post("/getAll", ClassController.GetClass);
childRouter.post("/update", ClassController.Update);
childRouter.post("/delete", ClassController.Delete);
childRouter.post("/fuzzyGroup", ClassController.GetFuzzyGroups);

module.exports = childRouter;