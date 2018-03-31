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
                    console.log("verify");
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

// 'use strict'

// module.exports = function () {

//     var token = '';
//     const bearer = 'bearer';

//     return function checktoken(ctx, next) {
//         if (ctx == null || ctx === 0 || Object.keys(ctx).length === 0) {
//             return ctx.throw("JWT token is bad formatted", 401);
//         } else {
//             const authorization = ctx.request.headers.authorization;
//             if (authorization) {
//                 var parts = authorization.split(' ');
//                 if (parts.length === 2 && parts[0] === bearer) {
//                     token = parts[1];
//                     ctx.state.authorizationHeader = authorization;
//                     return next();
//                 } else {
//                     return ctx.throw("JWT token is bad formatted", 401);
//                 }
//             } else {
//                 return ctx.throw("JWT token is mandatory", 401);
//             }
//         }
//     }
// }