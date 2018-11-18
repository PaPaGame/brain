var DaoBase = require('./DaoBase');
var ClassModel = require('../models').class;
var util = require('util');

var classModel;

function ClassDao(cm) {
  classModel = cm;
  DaoBase.call(this, cm);
}

util.inherits(ClassDao, DaoBase);

ClassDao.prototype.create = async info => {
  let originStaffInfo = info.staff;
  let staffInfo = {
    id: originStaffInfo._id,
    name: originStaffInfo.name
  };
  info.staff = staffInfo;
  return await ClassModel.create(info);
};

ClassDao.prototype.delete = async id => {
  return await ClassModel.remove({
    '_id': id
  });
};

ClassDao.prototype.getClassList = async query => {
  return await ClassModel.find(query);
};

ClassDao.prototype.updateClassInfo = async (info) => {
  return await ClassModel.update({
    _id: info.id
  }, {
    $set: info
  });
};

module.exports = ClassDao;
