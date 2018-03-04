import Router from "koa-router";
import { StaffController } from "../controller/index";

const childRouter = new Router();

//注册路由
childRouter.get("/staff/phone/:phone", StaffController.GetByPhone);
childRouter.get("/staff/name/:name", StaffController.GetByName);
childRouter.get("/staff/school/:school", StaffController.GetBySchool);
childRouter.get("/staff/fuzzy/:name", StaffController.GetByFuzzyName);
childRouter.post("/staff", StaffController.AddStaff);
childRouter.put("/staff", StaffController.UpdateStaff);
childRouter.delete("/staff", StaffController.DeleteStaff);
childRouter.get("/staff", StaffController.GetStaff);

module.exports = childRouter;