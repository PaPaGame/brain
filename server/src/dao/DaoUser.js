var DaoBase = require("./DaoBase");
var UsersModel = require("../models/user");
var util = require("util");

var UsersDAO = function (user) {
    this.user = user || {};
    DaoBase.call(this, this.user);
};

// 实现继承
util.inherits(UsersDAO, DaoBase);

// 扩展方法

/** 根据名字查找*/
UsersDAO.prototype.findByName = (user, callback) => {
    if (!user)
        callback({ err: 'err parameter' });

    UsersModel.findOne({ name: user.name }, (err, data) => {
        callback(err, user);
    });
}

module.exports = UsersDAO;