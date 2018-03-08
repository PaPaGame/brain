import jwt from "koa-jwt";
import StudentDao from "../dao/DaoStudent";

var StudentModel = require("../models").student;

var studentDao = new StudentDao(StudentModel);

const GetStudent = async (ctx) => {
    let students = await studentDao.getAll((err, data) => {
        // let student = await studentDao.getByQuery({}, () => {
        if (err)
            console.log(err);
    });

    if (students) {
        ctx.body = {
            status: 200,
            students: students
        };
    }
}

const GetFuzzyByName = async (ctx) => {
    let name = ctx.params["name"];
    // 正则忽略大小写  i
    let infos = await studentDao.getByQuery({ "firstName": { $regex: name, $options: 'i' } }, null, null, (err, data) => {
        if (err)
            console.log(err);
    });

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
    let result = studentDao.addStudent(userinfo);

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
    // console.log(userinfo);
    let result = await studentDao.getById(userinfo.id);

    if (result) {
        ctx.body = {
            status: 200,
            info: result
        };
    }
}

module.exports = {
    GetFuzzyByName,
    AddStudent,
    UpdateStudent,
    DeleteStudent,
    GetStudent,
    GetById
}