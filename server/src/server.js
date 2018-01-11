import Koa from "koa";
import onerror from "koa-onerror";
import convert from "koa-convert";
import cors from "koa-cors";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import resource from "koa-static";
import path from "path";
import http from "http";

import routers from "./routes";
import config from "../config/config"

//实例化koa
const app = new Koa();
// 错误处理
onerror(app);
// 跨域
app.use(convert(cors()));
// 日志
app.use(convert(logger()));

app.use(bodyParser());
// 设置静态资源路径
app.use(resource(path.join(__dirname, "../public")));

// 日志输出 请求URL
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 设置一下路由
app.use(routers.routes(), routers.allowedMethods());

// 全局管理一下出错信息
app.on("error", (error, ctx) => {
    console.log("server error:", error, JSON.stringify(ctx.onerror));
});

// 创建服务并监听配置的端口
http.createServer(app.callback()).listen(config.port).on('listening', function () {
    console.log("[server start]");
    console.log('listen port:' + config.port);
});

export default app;