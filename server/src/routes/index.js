import Router from "koa-router";
const router = Router();
// 用户相关路由
const userRouter = require("../routes/RouterUser");
const authRouter = require("../routes/RouterAuth");

// 用户相关路由
router.use("/api", userRouter.routes(), userRouter.allowedMethods());
//  登陆权限相关路由
router.use("/api", authRouter.routes(), authRouter.allowedMethods());

module.exports = router;