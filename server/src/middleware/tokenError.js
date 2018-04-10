const jwt = require('jsonwebtoken');
const config = require("../../config/config");
const util = require("util");
const verify = util.promisify(jwt.verify);

module.exports = () => {
    return async (ctx, next) => {
        let message = {};
        try {
            // 获取token
            const token = ctx.header.authorization;
            if (token) {
                try {
                    console.log("verify", token.split(' ')[1], config);
                    let payload = verify(token.split(' ')[1], config.tokenSecret);
                    ctx.user = {
                        name: payload.name,
                        id: payload.id
                    };
                } catch (err2) {
                    console.log(`token verify failed: ${err2}`);
                }
            }

            await next();

        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                message.status = 400;
                message.message = "认证失败";
                message.detail = err;
            } else {
                ctx.status = 404;
                message.status = 404;
                message.message = "404";
                message.detail = err;
            }
            ctx.body = message;
        }
    }
}