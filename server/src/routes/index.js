import Router from "koa-router";
const router = Router();
// 用户相关路由
const userRouter = require("../routes/RouterUser");
const authRouter = require("../routes/RouterAuth");
const schoolRouter = require("../routes/RouterSchool");
const articleRouter = require("../routes/RouterArticle");
const staffRouter = require("../routes/RouterStaff");
const classRouter = require("../routes/RouterClass");
const studentRouter = require("../routes/RouterStudent");

// 用户相关路由
router.use("/api", userRouter.routes(), userRouter.allowedMethods());
//  登陆权限相关路由
router.use("/api", authRouter.routes(), authRouter.allowedMethods());
// 校区相关路由
router.use("/api", schoolRouter.routes(), schoolRouter.allowedMethods());
// 文章相关路由
router.use("/api", articleRouter.routes(), articleRouter.allowedMethods());
// 老师相关路由
router.use("/api", staffRouter.routes(), staffRouter.allowedMethods());
// 班级相关的路由
router.use("/api", classRouter.routes(), classRouter.allowedMethods());
// 学生相关的路由
router.use("/api", studentRouter.routes(), studentRouter.allowedMethods());

module.exports = router;