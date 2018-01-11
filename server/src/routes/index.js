import Router from "koa-router";
const router = Router();
// 用户相关路由
const userRouter = require("../routes/RouterUser.js");

// 注册用户相关路由
router.use("/api", userRouter.routes(), userRouter.allowedMethods());

module.exports = router;