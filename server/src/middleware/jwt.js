import jwt from 'koa-jwt'
import config from '../../config/config'

export default function (unless) {
    console.log("unless", unless);
    return jwt({
        secret: config.tokenSecret
    }).unless(unless)
}