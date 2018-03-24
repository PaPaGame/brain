var DaoBase = require("./DaoBase");
var StaffModel = require("../models").staff;
var UserModel = require("../models").user;
var util = require("util");

var staff;
var StaffDao = function (staff) {
    staff = new staff();
    DaoBase.call(this, staff);
}

util.inherits(StaffDao, DaoBase);

StaffDao.prototype.addStaff = async (userinfo, callback) => {
    if (!userinfo)
        return callback({ err: 'err parameter' });

    let staff = new StaffModel({
        name: userinfo.name,
        mail: userinfo.mail,
        status: userinfo.status,
        group: userinfo.group,
        phone: userinfo.phone,
        school: userinfo.school
    });

    let staffResult = await StaffModel.create(staff);
    var user;
    if (staffResult) {
        let uid = staffResult._id;
        user = new UserModel({
            username: userinfo.name,
            password: userinfo.password,
            status: userinfo.status,
            role: userinfo.role,
            phone: userinfo.phone,
            mail: userinfo.mail,
            lastLoginTime: "",//new Date().toISOString(),
            lastLoginIP: "",
            school: userinfo.school,
            uid: uid
        });
    }
    return await UserModel.create(user);
}

StaffDao.prototype.deleteStaff = async userinfo => {

    let s = await StaffModel.findOne({ "name": userinfo.name });
    let uid = s._id;

    await StaffModel.deleteOne({ "name": userinfo.name });

    return await UserModel.deleteOne({ "uid": uid });
}

StaffDao.prototype.getStaffList = async queryinfo => {
    return await StaffModel.find(queryinfo);
}

module.exports = StaffDao;