import jwt from "koa-jwt";
import StaffDao from "../dao/DaoStaff";

var StaffModel = require("../models").staff;
var SchoolModel = require("../models").school;

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
};

const GetByFuzzyName = async (ctx) => {
    let queryInfo = ctx.request.body;
    let message = {};
    // 正则忽略大小写  i
    let infos = await StaffModel.find({ "name": { $regex: queryInfo.name + "", $options: 'i' } });
    if (!infos) {
        message.status = 400;
        message.message = "查询失败";
    } else {
        message.status = 200;
        message.staff = infos;
    }

    ctx.body = message;
};


const AddStaff = async (ctx) => {
    let info = ctx.request.body;
    let message = {};
    if (!info) {
        message.status = 400;
        message.message = "创建失败";
        ctx.body = message;
        return;
    }
    let result = staffDao.addStaff(info);

    if (result) {
        message.status = 200;
        message.message = "创建成功";
    } else {
        message.status = 400;
        message.message = "创建失败";
    }

    ctx.body = message;
}

const DeleteStaff = async (ctx) => {
    let message = {};
    let info = ctx.request.body;
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    // let result = await userDao.findByName(info);
    let result = await staffDao.deleteStaff(info);
    if (result) {
        message.status = 200;
        message.message = "删除成功";
    } else {
        message.status = 400;
        message.message = "删除失败";
    }

    ctx.body = message;
}

const GetStaff = async (ctx) => {

}

const GetStaffList = async ctx => {
    let message = {};
    let queryInfo = ctx.request.body;
    let query = {};
    if (queryInfo.school != "") {
        query.school = queryInfo.school;
    }
    let result = await staffDao.getStaffList(query);
    if (result) {
        message.status = 200;
        message.staffList = result;
    } else {
        message.status = 400;
        message.message = "查询失败";
    }

    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Get,
    Delete,
    GetByPhone,
    GetByName,
    GetBySchool,
    GetByFuzzyName,
    AddStaff,
    DeleteStaff,
    GetStaff,
    GetStaffList
}
