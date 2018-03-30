import SessionStorage from "./sessionStore";
var mongoose = require("mongoose");
const CONFIG = {
    key: 'brain:session', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    store: new SessionStorage({
        collection: "readmap",
        connection: mongoose.connection,
        expires: 86400,
        name: 'session'
    })
};

export default CONFIG;

// const CONFIG = { key: 'koa:sess', maxAge: 86400000, overwrite: true, httpOnly: true, signed: true, rolling: false, store: new SessionStore({ collection: 'navigation', //数据库集合 connection: Mongoose, // 数据库链接实例 expires: 86400, // 默认时间为1天 name: 'session' // 保存session的表名称 }) };