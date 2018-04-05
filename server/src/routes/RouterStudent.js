import Router from "koa-router";
import { StudentController } from "../controller/index";
import jwt from "../middleware/jwt";

const childRouter = new Router({
    prefix: '/student'
});

childRouter.use(jwt({}));

childRouter.post("/fuzzy", StudentController.GetFuzzyByName);
childRouter.post("", StudentController.AddStudent);
childRouter.put("", StudentController.UpdateStudent);
childRouter.delete("", StudentController.DeleteStudent);
// childRouter.get("", StudentController.GetStudent);
childRouter.post("/id", StudentController.GetById);
childRouter.post("/article", StudentController.UpdateArticleLevel);
childRouter.post("/all", StudentController.GetAllStudent);

module.exports = childRouter;