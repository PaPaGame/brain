import Router from "koa-router";
import { ArticleController } from "../controller/index";

const childRouter = new Router();

// 注册路由

childRouter.post("/article", ArticleController.Create);
// 获取文章列表
childRouter.get("/article", ArticleController.GetByID);
// 获取制定文章详情
childRouter.get("/article/id/:id", ArticleController.GetByID);
// 获取文章列表根据文章难度
childRouter.get("/article/level/:level", ArticleController.GetByLevel);
childRouter.put("/article/:id", ArticleController.Update);
childRouter.delete("/article/:id", ArticleController.Delete);

module.exports = childRouter;