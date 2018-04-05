var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var util = require("util");

var s;
var StudentDao = function (stModel) {
    s = new stModel()
    DaoBase.call(this, stModel);
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

    let result = await StudentModel.create(student);

    var user;
    if (result) {
        let uid = result._id;
        user = new UserModel({
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
    }

    return await UserModel.create(user);
}

StudentDao.prototype.deleteByUserName = async userinfo => {
    if (!userinfo) {
        console.log("error userinfo");
        return;
    }

    let s = await StudentModel.findOne({ "username": userinfo.username });
    let uid = s._id;

    await StudentModel.deleteOne({ "username": userinfo.username });

    return await UserModel.deleteOne({ "uid": uid });
}

// 更新学生文章等级
StudentDao.prototype.updateArticleLevel = async articleInfo => {
    // 用户id
    let id = articleInfo.id;
    let user = await StudentModel.findOne({ "_id": id });

    if (!user) {
        return null;
    }

    let arr = articleInfo.levels;
    return await StudentModel.update({ "_id": id }, { $set: { "articleLevel": arr } });
}

StudentDao.prototype.getAllStudent = async info => {
    let message = {};
    console.log(info);
    let student = await StudentModel.find(info);

    if (student) {
        return student;
    } else {
        return [];
    }
}

StudentDao.prototype.findFuzzyName = async (name, school) => {

    let condition = {};
    condition.username = { $regex: name + "", $options: 'i' };
    if (school) {
        condition.school = school;
    }

    console.log(condition);
    return await StudentModel.find(
        condition
    );
}
module.exports = StudentDao;