
const Router = require("koa-router");
const userController = require("../controller/CtlUser.js");

const childRouter = new Router();

childRouter.put("/user", userController.Create);
childRouter.post("/user/login", userController.Login);
childRouter.post("/user/exist", userController.Exist);
childRouter.get("/user", userController.Get);
childRouter.delete("/user", userController.Delete);
childRouter.post("/user/staff", userController.AddStaff);
childRouter.put("/user/staff", userController.UpdateStaff);
childRouter.delete("/user/staff", userController.DeleteStaff);
childRouter.get("/user/staff", userController.GetStaff);
childRouter.post("/user/student", userController.AddStudent);
childRouter.put("/user/student", userController.UpdateStudent);
childRouter.delete("/user/student", userController.DeleteStudent);
childRouter.get("/user/student", userController.GetStudent);

module.exports = childRouter;