import jwt from "koa-jwt";
import ClassDao from "../dao/DaoClass";

var ClassModel = require("../models").class;

var classDao = new ClassDao(ClassModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
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

    let result = await classDao.update({ _id: `${info._id}` }, { $set: info }, null, null, (err, data) => {
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

const FuzzyGet = async (ctx) => {

};

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    FuzzyGet
};