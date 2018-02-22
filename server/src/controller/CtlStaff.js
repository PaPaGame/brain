import jwt from "koa-jwt";
import StaffDao from "../dao/DaoStaff";

var StaffModel = require("../models").staff;

var staffDao = new StaffDao(StaffModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
    console.log(info);
    let result = staffDao.create(info, (err, data) => {
        if (err)
            console.log(err);
    });

    if (result) {
        ctx.body = { status: 200 };
    }
}

const Update = async (ctx) => {
    let info = ctx.request.body;
    let result = staffDao.update({ id: `${info._id}` }, { $set, info }, null, err => {
        if (err)
            console.log(err);
    });

    if (result) {
        ctx.body = { status: 200 };
    }
}

const Get = async (ctx) => {
    // 获取所有老师
    let staffs = await staffDao.getAll((err, data) => {
        if (err)
            console.log(err);
    })

    ctx.body = { staffs: staffs };
}

const Delete = async (ctx) => {
    let data = ctx.request.body;
    let result = await staffDao.delete({ _id: `${data._id}` }, err => {
        if (err)
            console.log(err);
    });

    if (result) {
        ctx.body = {
            status: 200
        };
    }
}

// 根据电话查找用户
const GetByPhone = async (ctx) => {
    let phone = ctx.params["phone"];
    let staff = await staffDao.getByQuery({ phone: `${phone}` }, null, null, (err, data) => {
        if (err)
            console.log(err);
    });

    if (staff) {
        ctx.body = {
            staff: staff,
            status: 200
        };
    }
}

// 根据用户名查找用户
const GetByName = async (ctx) => {
    let name = ctx.params["name"];
    // console.log("query name is:", name);
    let staff = await staffDao.getByQuery({ name: `${name}` }, null, null, (err, data) => {
        if (err)
            console.log(err);
    });

    if (staff) {
        ctx.body = {
            staff: staff,
            status: 200
        };
    }
}

const GetBySchool = async (ctx) => {
    let school = ctx.params['school'];
    let staffs = await staffDao.getByQuery({ "school": school }, null, null, (err, data) => {
        if (err)
            console.log(err);
    });

    ctx.body = {
        staffs: staffs,
        status: 200
    };
}

module.exports = {
    Create,
    Update,
    Get,
    Delete,
    GetByPhone,
    GetByName,
    GetBySchool
}
