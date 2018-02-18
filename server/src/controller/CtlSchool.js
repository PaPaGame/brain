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

    // SchoolModel.findOneAndUpdate({ code: `${code}` }, info)

    let scinfo = school;
    scinfo.phone = 19999999911;

    // console.log(scinfo);
    schoolDao.update({ _id: `${scinfo._id}` }, { $set: scinfo }, null, err => {
        if (!!err) {
            console.log(err);
        }

        console.log("ok");
    });
}

const Delete = async (ctx) => {
    let code = ctx.params["code"];
    schoolDao.delete({ code: `${code}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });
}

var school;
const Get = async (ctx) => {
    let code = ctx.params['code'];
    console.log("获取学校详情,学校代码", code);
    schoolDao.getByQuery({ code: `${code}` }, null, null, (err, data) => {
        if (!!err)
            console.log(`${err}`);

        school = data[0];
        console.log(data);
    });
}

module.exports = {
    Create,
    Update,
    Delete,
    Get
};