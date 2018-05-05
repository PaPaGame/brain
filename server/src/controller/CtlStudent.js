import StudentDao from "../dao/DaoStudent";

var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var studentDao = new StudentDao(StudentModel);

const GetStudent = async (ctx) => {
    let message = {};
    let students = await studentDao.getAll();


    if (students) {
        message.status = 200;
        message.students = students;
    }

    ctx.body = message;
}

const GetFuzzyByName = async (ctx) => {
    let info = ctx.request.body;
    let message = {};
    if (!info) {
        message.status = 400;
        message.message = "查询参数有误";
        ctx.body = message;
        return;
    }

    // 正则忽略大小写  i
    let infos = await studentDao.findFuzzyName(info.name, info.school);

    if (infos) {
        ctx.body = {
            infos: infos,
            status: 200
        };
    }
}


const AddStudent = async (ctx) => {
    let userinfo = ctx.request.body;
    let message = {};

    // 先查询是否有这个用户名
    let checkResult = await UserModel.findOne({ "username": userinfo.username });
    if (checkResult) {
        message.status = 400;
        message.message = "账号已存在";
        ctx.body = message;

    }

    let result = await studentDao.addStudent(userinfo);

    if (result) {
        message.status = 200;
        message.message = "创建成功";
    } else {
        message.status = 400;
        message.message = "创建失败";
    }

    ctx.body = message;
}

const UpdateStudent = async (ctx) => {

}

const DeleteStudent = async (ctx) => {
    let message = {};
    let userinfo = ctx.request.body;
    // 传进来的是student 表里的id  记录下来， 删除成功后再去user表里删除
    let studentResult = await studentDao.delete({ "_id": userinfo.id });

    if (studentResult) {
        let userResult = await UserModel.remove({ "uid": userinfo.id });
        if (userResult) {
            message.status = 200;
            message.message = "删除成功";
        } else {
            message.status = 400;
            message.message = "删除失败";
        }
    } else {
        message.status = 400;
        message.message = "删除失败";
    }
    ctx.body = message;
}

const GetById = async (ctx) => {
    let userinfo = ctx.request.body;
    let message = {};
    // console.log(userinfo);
    let result = await studentDao.getById(userinfo.id);

    if (result) {
        message.status = 200;
        message.info = result;
    } else {
        message.status = 400;
        message.message = `未找到id为${userinfo.id}的学生`;
    }

    ctx.body = message;
}

const UpdateArticleLevel = async ctx => {
    let articleInfo = ctx.request.body;
    let message = {};
    let user = await studentDao.getById(articleInfo.id);

    if (!user) {
        message.status = 400;
        message.message = "未查到指定学生";
        ctx.body = message;
        return;
    }

    let result = await studentDao.updateArticleLevel(articleInfo);
    if (!result) {
        message.status = 400;
        message.message = "更新失败";
        ctx.body = message;
        return;
    }

    message.status = 200;
    message.message = "更新成功";
    ctx.body = message;

}

const GetAllStudent = async ctx => {
    let message = {};
    let info = ctx.request.body;
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await studentDao.getAllStudent(info);
    let count = await studentDao.countByQuery({});
    if (result) {
        message.status = 200;
        message.students = result;
        message.count = count;
    } else {
        message.status = 400;
        message.message = "查询失败";
    }

    ctx.body = message;
}

module.exports = {
    GetFuzzyByName,
    AddStudent,
    UpdateStudent,
    DeleteStudent,
    // GetStudent,
    GetById,
    UpdateArticleLevel,
    GetAllStudent
}