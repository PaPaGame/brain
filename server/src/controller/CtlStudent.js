import jwt from "koa-jwt";
import StudentDao from "../dao/DaoStudent";

var StudentModel = require("../models").student;

var studentDao = new StudentDao(StudentModel);

var Create = async (ctx) => {

};

var Get = async (ctx) => {

}

var GetFuzzyByName = async (ctx) => {
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


module.exports = {
    Create,
    Get,
    GetFuzzyByName
}