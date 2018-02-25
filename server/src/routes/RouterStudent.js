import Router from "koa-router";
import { StudentController } from "../controller/index";

const childRouter = new Router();

childRouter.post("/student", StudentController.Create);
childRouter.get("/student/fuzzy/:name", StudentController.GetFuzzyByName);
childRouter.get("/student", StudentController.Get);

module.exports = childRouter;