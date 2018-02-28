var DaoBase = require("./DaoBase");
var CourseModel = require("../models").course;
var util = require("util");

var course;
var CourseDao = function (course) {
    this.course = course || {};
    DaoBase.call(this, this.course);
}

util.inherits(CourseDao, DaoBase);

module.exports = CourseDao;