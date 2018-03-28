var DaoBase = require("./DaoBase");
var ClassModel = require("../models").class;
var util = require("util");

var classModel;
var ClassDao = function (classModel) {
    classModel = new classModel();
    DaoBase.call(this, classModel);
}

util.inherits(ClassDao, DaoBase);

ClassDao.prototype.getClassList = async query => {
    return await ClassModel.find(query);
}

ClassDao.prototype.updateClassInfo = async (info) => {
    return await ClassModel.update({ _id: info._id }, { $set: info });
}

module.exports = ClassDao;