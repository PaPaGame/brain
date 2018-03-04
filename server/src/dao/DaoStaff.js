var DaoBase = require("./DaoBase");
var StaffModel = require("../models").staff;
var UserModel = require("../models").user;
var util = require("util");

var staff;
var StaffDao = function (staff) {
    this.staff = staff || {};
    DaoBase.call(this, this.staff);
}

util.inherits(StaffDao, DaoBase);

StaffDao.prototype.addStaff = async (userinfo, callback) => {
    if (!userinfo)
        return callback({ err: 'err parameter' });

    let staff = new StaffModel({
        name: userinfo.username,
        mail: userinfo.mail,
        status: userinfo.status,
        group: userinfo.group,
        phone: userinfo.phone,
        school: userinfo.school
    });

    let staffResult = await StaffModel.create(staff).then(res => {
        // console.log(res);
        let uid = res._id;
        // console.log(uid);
        let user = new UserModel({
            username: userinfo.username,
            password: userinfo.password,
            status: userinfo.status,
            role: userinfo.role,
            phone: userinfo.phone,
            mail: userinfo.mail,
            lastLoginTime: new Date().toISOString(),
            lastLoginIP: "",
            school: userinfo.school,
            uid: uid
        });
        return UserModel.create(user);
    });
}

StaffDao.prototype.deleteStaff = async (userinfo, callback) => {
    let staffId = userinfo.uid;
    let userId = userinfo._id;

    console.log("userID:" + userId);
    console.log("staffID:" + staffId);

    await StaffModel.remove({ "_id": staffId }).then(res => {

        return UserModel.remove({ "_id": userId });
    });
}

module.exports = StaffDao;