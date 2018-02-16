var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
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

    StudentModel.findOne({ username: user.username }, (err, data) => {
        callback(err, data);
    });
}

module.exports = UsersDAO;