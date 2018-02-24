var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
var util = require("util");

var student;
var StudentDao = function (student) {
    this.student = student || {};
    DaoBase.call(this, this.student);
}

util.inherits(StudentDao, DaoBase);

module.exports = StudentDao;