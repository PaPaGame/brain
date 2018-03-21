import jwt from "koa-jwt";
import ClassDao from "../dao/DaoClass";

var ClassModel = require("../models").class;

var classDao = new ClassDao(ClassModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
    console.log(info);
    let result = await classDao.create(info, (err, data) => {
        if (err)
            console.log(err);
    });

    if (result) {
        ctx.body = { status: 200 };
    }
};
const Update = async (ctx) => {
    let info = ctx.request.body;
    if (!info)
        return;

    let result = await classDao.update({ _id: `${info._id}` }, { $set: info }, null, err => {
        if (err)
            console.log(err);
    });

    if (result)
        ctx.body = { status: 200 };
};
const Delete = async (ctx) => {
    let info = ctx.request.body;
    if (!info)
        return;
    let result = await classDao.delete({ _id: `${info._id}` }, (err, data) => {
        if (err)
            console.log(err);
    })

    if (result)
        ctx.body = { status: 200 };
};
const Get = async (ctx) => {
    let name = ctx.params["name"];
    if (!name) {
        let classes = await classDao.getAll((err, data) => {
            if (err)
                console.log(err);
        });

        ctx.body = {
            status: 200,
            classInfos: classes
        };
    } else {
        let classInfo = await classDao.findOne({ name: name }, (err, data) => {
            if (err)
                console.log(err);
        });

        ctx.body = {
            status: 200,
            classInfo: classInfo
        };
    }
};

const GetFuzzyGroups = async ctx => {
    let message = {};
    let info = ctx.request.body;
    console.log("aaaa", info);
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await ClassModel.find({ "name": { $regex: info.name, $options: 'i' } });

    message.status = 200;
    message.group = result ? result : [];
    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    GetFuzzyGroups
};