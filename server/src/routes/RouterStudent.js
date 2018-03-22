import Router from "koa-router";
import { StudentController } from "../controller/index";

const childRouter = new Router();

childRouter.get("/student/fuzzy/:name", StudentController.GetFuzzyByName);
childRouter.post("/student", StudentController.AddStudent);
childRouter.put("/student", StudentController.UpdateStudent);
childRouter.delete("/student", StudentController.DeleteStudent);
// childRouter.get("/student", StudentController.GetStudent);
childRouter.post("/student/id", StudentController.GetById);
childRouter.post("/student/article", StudentController.UpdateArticleLevel);
childRouter.post("/student/all", StudentController.GetAllStudent);

module.exports = childRouter;