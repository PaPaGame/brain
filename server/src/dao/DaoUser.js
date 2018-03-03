import { SchemaTypes } from "mongoose";

var DaoBase = require("./DaoBase");
var UserModel = require("../models").user;
var StaffModel = require("../models").staff;
var util = require("util");
var mongoose = require("mongoose");

var user;
var UsersDAO = function (user) {
    this.user = user || {};
    DaoBase.call(this, this.user);
};

// 实现继承
util.inherits(UsersDAO, DaoBase);

// 扩展方法

/** 根据名字查找*/
UsersDAO.prototype.findByName = async (userinfo, callback) => {
    if (!userinfo)
        callback({ err: 'err parameter' });

    return await UserModel.findOne({ username: userinfo.username }, (err, data) => {
        if (err)
            console.log(err);

        callback(err, data);
    });
}

UsersDAO.prototype.addStaff = async (userinfo, callback) => {
    if (!userinfo)
        return callback({ err: 'err parameter' });

    let staff = new StaffModel({
        name: userinfo.username,
        mail: userinfo.mail,
        status: userinfo.status,
        group: userinfo.group,
        phone: userinfo.phone,
        school: userinfo.school
    });

    let staffResult = await StaffModel.create(staff).then(res => {
        // console.log(res);
        let uid = res._id;
        // console.log(uid);
        let user = new UserModel({
            username: userinfo.username,
            password: userinfo.password,
            status: userinfo.status,
            role: userinfo.role,
            phone: userinfo.phone,
            mail: userinfo.mail,
            lastLoginTime: new Date().toISOString(),
            lastLoginIP: "",
            school: userinfo.school,
            uid: uid
        });
        return UserModel.create(user);
    });





    // console.log("aaaaa:" + userSaveResult);
}

module.exports = UsersDAO;