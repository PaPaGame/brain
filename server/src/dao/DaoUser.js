var DaoBase = require("./DaoBase");
var UserModel = require("../models").user;
var util = require("util");

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

    return UserModel.findOne({ username: userinfo.username }, (err, data) => {
        if (err)
            console.log(err);

        callback(err, data);
    });
}

module.exports = UsersDAO;