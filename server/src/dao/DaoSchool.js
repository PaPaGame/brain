var DaoBase = require("./DaoBase");
var SchoolModel = require("../models").school;
var util = require("util");

var school;
var SchoolDao = function (school) {
    this.school = school || {};
    DaoBase.call(this, this.school);
}

util.inherits(SchoolDao, DaoBase);

module.exports = SchoolDao;