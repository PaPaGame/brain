import Router from "koa-router";
import { CourseController } from "../controller/index";
const childRouter = new Router();

childRouter.post("/course/add", CourseController.AddCourse);

module.exports = childRouter;