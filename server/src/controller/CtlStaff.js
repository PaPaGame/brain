import jwt from "koa-jwt";
import StaffDao from "../dao/DaoStaff";

var StaffModel = require("../models").staff;

var staffDao = new StaffDao(StaffModel);

const Create = async (ctx) => {

}

const Update = async (ctx) => {

}

const Get = async (ctx) => {

}

const Delete = async (ctx) => {

}

// 根据电话查找用户
const GetByPhone = async (ctx) => {
    let phone = ctx.params["phone"];
    console.log("query phone is:", phone);
}

// 根据用户名查找用户
const GetByName = async (ctx) => {
    let name = ctx.params["name"];
    console.log("query name is:", name);
}

module.exports = {
    Create,
    Update,
    Get,
    Delete,
    GetByPhone,
    GetByName
}
