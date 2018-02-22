import Router from "koa-router";
import { StaffController } from "../controller/index";

const childRouter = new Router();

//注册路由
childRouter.post("/staff", StaffController.Create);
childRouter.get("/staff", StaffController.Get);
childRouter.put("/staff", StaffController.Update);
childRouter.delete("/staff", StaffController.Delete);
childRouter.get("/staff/phone/:phone", StaffController.GetByPhone);
childRouter.get("/staff/name/:name", StaffController.GetByName);
childRouter.get("/staff/school/:school", StaffController.GetBySchool);

module.exports = childRouter;