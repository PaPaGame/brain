import Router from "koa-router";
import jwt from "../middleware/jwt";
import { CourseController } from "../controller/index";

const childRouter = new Router({
    prefix: '/course'
});

childRouter.use(jwt({}));
childRouter.post("/add", CourseController.AddCourse);
childRouter.post("/remove", CourseController.RemoveCourseByLevel);
childRouter.post("/tai", CourseController.AnswerTai);
childRouter.post("/quiz", CourseController.AnswerQuiz);
childRouter.post("/get", CourseController.GetCourse);
childRouter.post("/record", CourseController.SendRecord);

module.exports = childRouter;