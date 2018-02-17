import jwt from "koa-jwt";
import SchoolDao from "../dao/DaoSchool";

var SchoolModel = require("../models").school;

var schoolDao = new SchoolDao(SchoolModel);

const Create = async (ctx) => {

}

const Update = async (ctx) => {
    let code = ctx.params["code"];
    let info = ctx.request.body;

    // console.log(info);
    // schoolDao.update({ code: `${code}` }, { $set: info }, null, err => {
    //     if (!!err)
    //         console.log(`${err}`);

    //     console.log("更新成功");
    // });

    SchoolModel.findOneAndUpdate({ code: `${code}` }, info)
}

const Delete = async (ctx) => {
    let code = ctx.params["code"];
    schoolDao.delete({ code: `${code}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });
}

const Get = async (ctx) => {
    let code = ctx.params['code'];
    console.log("获取学校详情,学校代码", code);
    schoolDao.getByQuery({ code: `${code}` }, null, null, (err, data) => {
        if (!!err)
            console.log(`${err}`);

        console.log(data);
    });
}

const GetAllSchool = async (ctx) => {

}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    GetAllSchool
};