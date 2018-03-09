import jwt from "koa-jwt";
import CourseDao from "../dao/DaoCourse";

var CourseModel = require("../models").course;

var courseDao = new CourseDao(CourseModel);

const AddCourse = async ctx => {
    let message = {};
    let userinfo = ctx.request.body;
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }
    await courseDao.addCourse(userinfo);
}

const RemoveCourseByLevel = async ctx => {
    let message = {};
    let userinfo = ctx.request.body;
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    await courseDao.removeByLevel(userinfo);
}

module.exports = {
    AddCourse,
    RemoveCourseByLevel
};