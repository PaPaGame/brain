import SchoolDao from "../dao/DaoSchool";

var SchoolModel = require("../models").school;

var schoolDao = new SchoolDao(SchoolModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
    console.log("创建", info, SchoolModel);

    let result = await SchoolModel.create(info);
    // let result = await schoolDao.create(info);

    if (result)
        ctx.body = { status: 200 };
}

const Update = async (ctx) => {
    let info = ctx.request.body;
    await schoolDao.update({ _id: `${info._id}` }, { $set: info }, null, err => {
        if (!!err) {
            console.log(err);
        }

        console.log("ok");
    });
}

const Delete = async (ctx) => {
    let data = ctx.request.body;
    let result = schoolDao.delete({ _id: `${data.id}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });

    if (result) {
        ctx.body = { status: 200 };
    }

}

const Get = async ctx => {
    let code = ctx.params['code'];
    // let message = {};

    // // console.log(ctx.state);
    // let schoolCode = ctx.state.user.school;
    // let schools;
    // if (schoolCode === "") {
    //     console.log("获取全部学校详情");
    //     schools = await schoolDao.findAllSchool();
    //     console.log("all school", schools);
    // } else {
    //     schools = await schoolDao.getByQuery({ code: `${schoolCode}` }, null, null, (err, data) => {
    //         if (!!err)
    //             console.log(`${err}`);
    //     });
    // }

    // message.status = 200;
    // message.schools = schools;
    // ctx.body = message;



    if (!code) {
        console.log("获取全部学校详情");
        let school = await schoolDao.findAllSchool();

        ctx.body = { schools: school };
    } else {
        console.log("获取学校详情,学校代码", code);
        let school = await schoolDao.getByQuery({ code: `${code}` }, null, null, (err, data) => {
            if (!!err)
                console.log(`${err}`);
        });

        ctx.body = { schools: school };
    }
}

const GetAll = async ctx => {
    let message = {};
    let schoolCode = ctx.state.user.school;
    let schools;
    if (schoolCode === "") {
        schools = await schoolDao.findAllSchool();
    } else {
        schools = await schoolDao.getByQuery({ code: `${code}` });
    }

    if (!schools) {
        message.status = 400;
        message.message = " 获取学校列表失败";
        ctx.body = message;
        return;
    }

    message.status = 200;
    message.schools = schools;
    ctx.body = message;
}

const FuzzyList = async ctx => {
    let message = {};
    let info = ctx.request.body;
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
    }

    let result = await SchoolModel.find({ "code": { $regex: info.code, $options: 'i' } });

    message.status = 200;
    message.school = result ? result : [];
    ctx.body = message;
}

const isExist = async ctx => {
    let message = {};
    let code = ctx.request.body.code;
    let result = await schoolDao.isExist(code);
    if (!code) {
        message.status = 400;
        message.message = "学校码不正确";
        ctx.body = message;
        return;
    }

    message.status = 200;
    message.exist = result != null;
    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    GetAll,
    FuzzyList,
    isExist
};