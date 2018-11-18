var DaoBase = require('./DaoBase');
var StaffModel = require('../models').staff;
var UserModel = require('../models').user;
var util = require('util');

var staffModel;

function StaffDao(sm) {
  staffModel = sm;
  DaoBase.call(this, sm);
}

util.inherits(StaffDao, DaoBase);

StaffDao.prototype.addStaff = async (userinfo, callback) => {
  if (!userinfo)
    return callback({
      err: 'err parameter'
    });
  userinfo.status = 1;
  let staffResult = await StaffModel.create(userinfo);
  var user;
  if (staffResult) {
    userinfo.role = '400';
    userinfo.uid = staffResult._id;
    userinfo.username = userinfo.name;
  }

  console.log(userinfo);
  return await UserModel.create(userinfo);
};

StaffDao.prototype.deleteStaff = async userinfo => {

  let s = await StaffModel.findOne({
    'name': userinfo.name
  });
  let uid = s._id;

  await StaffModel.deleteOne({
    'name': userinfo.name
  });

  return await UserModel.deleteOne({
    'uid': uid
  });
};

StaffDao.prototype.getStaffList = async queryinfo => {
  let pageSize = parseInt(queryinfo.pageSize);
  let pageId = Math.max(parseInt(queryinfo.currentPage) - 1, 0);
  let condition = queryinfo.school === '' ? {} : {
    'school': queryinfo.school
  };
  return await StaffModel.find(condition).limit(pageSize).skip(pageSize * pageId);;
};

module.exports = StaffDao;
