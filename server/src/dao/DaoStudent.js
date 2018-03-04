var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
var util = require("util");

var student;
var StudentDao = function (student) {
    this.student = student || {};
    DaoBase.call(this, this.student);
}

util.inherits(StudentDao, DaoBase);

StudentDao.prototype.addStudent = async (userinfo, callback) => {
    if (!userinfo)
        return callback({ err: 'err parameter' });

    let student = new StudentModel({

    });
}

module.exports = StudentDao;