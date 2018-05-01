import { SchemaTypes } from "mongoose";

var DaoBase = require("./DaoBase");
var UserModel = require("../models").user;
var StaffModel = require("../models").staff;
var util = require("util");
var mongoose = require("mongoose");

var u;
function UsersDAO(um) {
    u = new um();
    DaoBase.call(this, um);
};

// 实现继承
util.inherits(UsersDAO, DaoBase);

// 扩展方法

/** 根据名字查找*/
UsersDAO.prototype.findByUsername = async userinfo => {
    if (!userinfo)
        return {};
    return await UserModel.findOne({
        username: userinfo.username
    });
}

UsersDAO.prototype.changePassword = async passwordInfo => {
    if (!passwordInfo)
        return await null;
    let uid = passwordInfo.id;
    let pwd = passwordInfo.password;

    u.password = pwd;

    return await UserModel.update({ "_id": uid }, { $set: { "hash_password": u.hash_password } });
}

UsersDAO.prototype.getUserInfo = async id => {
    return await UserModel.findOne({ "_id": id });
}
module.exports = UsersDAO;