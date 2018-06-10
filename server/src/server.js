import Koa from "koa";
import onerror from "koa-onerror";
import convert from "koa-convert";
import cors from "koa2-cors"
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import resource from "koa-static";
import path from "path";
import http from "http";
// import session from "koa-session";
import tokenError from "./middleware/tokenError";
const jwt = require('koa-jwt');
import routers from "./routes";
import config from "../config/config";
import { connectDatabase } from "./models/index";

//实例化koa
const app = new Koa();

// 跨域
app.use(cors({
    origin: function(ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 设置静态资源路径
app.use(resource(path.join(__dirname, "../public")));
app.use(convert(bodyParser()));
// 日志
app.use(convert(logger()));
// 设置一下路由
app.use(routers.routes(), routers.allowedMethods());
// jwt token验证
app.use(tokenError());


// 日志输出 请求URL
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico')
        return;
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});



// 全局管理一下出错信息
// app.on("error", (error, ctx) => {
//     console.log("server error:", error, JSON.stringify(ctx.onerror));
// });

// 错误处理
onerror(app);

// 创建服务并监听配置的端口
app.listen(config.port).on('listening', function() {
    console.log("[server start]");
    console.log('listen port:' + config.port);
});

connectDatabase("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");

export default app;