var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var util = require("util");

var student;
var StudentDao = function(student) {
    this.student = student || {};
    DaoBase.call(this, this.student);
}

util.inherits(StudentDao, DaoBase);

StudentDao.prototype.addStudent = async (userinfo) => {
    if (!userinfo) {
        console.log("params error");
        return;
    }

    let student = new StudentModel({
        username: userinfo.username,
        group: userinfo.group,
        school: userinfo.school,
        articleLevel: userinfo.article || [],
        validateTime: 10
    });

    let result = await StudentModel.create(student).then(res => {
        let uid = res._id;
        let user = new UserModel({
            username: userinfo.username,
            password: userinfo.password,
            status: userinfo.status,
            role: "1",
            phone: userinfo.phone,
            mail: userinfo.mail,
            lastLoginTime: new Date().toISOString(),
            lastLoginIP: "",
            school: userinfo.school,
            uid: uid
        });

        return UserModel.create(user);
    })
}

module.exports = StudentDao;