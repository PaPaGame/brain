import jwt from "../middleware/jwt";
import Router from "koa-router";
import { ArticleController } from "../controller/index";

const childRouter = new Router({
    prefix: '/article'
});

childRouter.use(jwt({}));
// 注册路由
childRouter.post("", ArticleController.Create);
// 获取文章列表
childRouter.get("", ArticleController.GetByID);
// 获取制定文章详情
childRouter.get("/id/:id", ArticleController.GetByID);
// 获取文章列表根据文章难度
childRouter.get("/level/:level", ArticleController.GetByLevel);
childRouter.put("/:id", ArticleController.Update);
childRouter.delete("/:id", ArticleController.Delete);
childRouter.post("/level", ArticleController.GetLevelList);
childRouter.post("/list", ArticleController.GetArticleList);

module.exports = childRouter;