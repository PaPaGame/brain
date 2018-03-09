import Router from "koa-router";
import { CourseController } from "../controller/index";
const childRouter = new Router();

childRouter.post("/course/add", CourseController.AddCourse);
childRouter.post("/course/remove", CourseController.RemoveCourseByLevel);

module.exports = childRouter;