import Router from 'koa-router';
const router = Router({
  prefix: '/api'
});
// 用户相关路由
const userRouter = require('../routes/RouterUser');
const schoolRouter = require('../routes/RouterSchool');
const articleRouter = require('../routes/RouterArticle');
const staffRouter = require('../routes/RouterStaff');
const classRouter = require('../routes/RouterClass');
const studentRouter = require('../routes/RouterStudent');
const courseRouter = require('../routes/RouterCourse');

// 用户相关路由
router.use(userRouter.routes(), userRouter.allowedMethods());
// 校区相关路由
router.use(schoolRouter.routes(), schoolRouter.allowedMethods());
// 文章相关路由
router.use(articleRouter.routes(), articleRouter.allowedMethods());
// 老师相关路由
router.use(staffRouter.routes(), staffRouter.allowedMethods());
// 班级相关的路由
router.use(classRouter.routes(), classRouter.allowedMethods());
// 学生相关的路由
router.use(studentRouter.routes(), studentRouter.allowedMethods());
// 课程相关路由
router.use(courseRouter.routes(), courseRouter.allowedMethods());

module.exports = router;