var DaoBase = require("./DaoBase");
var ClassModel = require("../models").class;
var util = require("util");

var classModel;
var ClassDao = function (classModel) {
    this.classModel = classModel || {};
    DaoBase.call(this, this.classModel);
}

util.inherits(ClassDao, DaoBase);

ClassDao.prototype.getClassList = async query => {
    console.log(query);
    return await ClassModel.find(query);
}

module.exports = ClassDao;