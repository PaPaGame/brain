import Router from "koa-router";
import jwt from "../middleware/jwt";
import { SchoolController } from "../controller/index";

const childRouter = new Router({
    prefix: '/school'
});

childRouter.use(jwt({}));
// 注册路由
childRouter.post("/create", SchoolController.Create);
// childRouter.post("/:code", SchoolController.Get);
childRouter.post("/all", SchoolController.GetAll);
childRouter.post("/update", SchoolController.Update);
childRouter.post("/delete", SchoolController.Delete);
childRouter.post("/fuzzyList", SchoolController.FuzzyList);

module.exports = childRouter;