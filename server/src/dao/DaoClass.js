var DaoBase = require("./DaoBase");
var ClassModel = require("../models").classModel;
var util = require("util");

var classModel;
var ClassDao = function (classModel) {
    this.classModel = classModel || {};
    DaoBase.call(this, this.classModel);
}

util.inherits(ClassDao, DaoBase);

module.exports = ClassDao;