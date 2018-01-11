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

}

UsersDAO.prototype.regist = (callback) => {

}

module.exports = UsersDAO;