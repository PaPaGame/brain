import jwt from "koa-jwt";
import CourseDao from "../dao/DaoCourse";

var CourseModel = require("../models").course;

var courseDao = new CourseDao(CourseModel);

// 根据学生id 找到 对应的文章等级列表再去文章表找到所有的文章，再插入到课程表内
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
    message.status = 200;
    message.message = "添加成功";
    ctx.body = message;
}

// 根据文章等级和用户id 删除课程表内的 课程数据
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

// 回答灯泡
const AnswerTai = async ctx => {
    let message = {};
    let userinfo = ctx.request.body;
    // userinfo: user._id; 课程id, 正确率
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await courseDao.answerTai(userinfo);
    if (result) {
        message.status = 200;
        message.message = "tai修改成功";
        ctx.body = message;
    }
}

const AnswerQuiz = async ctx => {
    let userinfo = ctx.request.body;
    let message = {};
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await courseDao.answerQuiz(userinfo);
    if (result) {
        message.status = 200;
        message.message = "quiz修改成功";
        ctx.body = message;
    }
}

module.exports = {
    AddCourse,
    RemoveCourseByLevel,
    AnswerTai,
    AnswerQuiz
};