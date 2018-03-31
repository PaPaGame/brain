import jwt from "../middleware/jwt";
const Router = require("koa-router");
const userController = require("../controller/CtlUser.js");

const childRouter = new Router({
    prefix: '/user'
});

childRouter.use(jwt({
    path: [
        /^\/api\/user\/login/,
        /^\/api\/user\/logout/
    ]
}));

///^\/backapi\/admin\/login/

childRouter.put("/add", userController.Create);
childRouter.post("/login", userController.Login);
childRouter.post("/exist", userController.Exist);
childRouter.get("", userController.Get);
childRouter.delete("", userController.Delete);
childRouter.post("/info", userController.GetUserInfo);
childRouter.post("/logout", userController.Logout);
childRouter.post("/password", userController.ChangePassword);

module.exports = childRouter;