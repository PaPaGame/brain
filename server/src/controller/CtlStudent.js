import StudentDao from "../dao/DaoStudent";

var StudentModel = require("../models").student;
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
    let userinfo = ctx.request.body;
    let message = {};
    let result = await studentDao.deleteByUserName(userinfo);
    if (result) {
        message.status = 200;
        message.message = "删除成功";
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

    let query = info.school == "" ? {} : { school: info.school };
    let result = await studentDao.getAllStudent(query);
    if (result) {
        message.status = 200;
        message.students = result;
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