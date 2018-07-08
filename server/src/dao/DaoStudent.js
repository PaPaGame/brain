var DaoBase = require("./DaoBase");
var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var util = require("util");

var studentModel;
function StudentDao(stModel) {
    studentModel = stModel;
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

    if (result) {
        let uid = result._id;
        userinfo.uid = uid;
        userinfo.role = "10";
        // user = new UserModel({
        //     username: userinfo.username,
        //     password: userinfo.password,
        //     status: userinfo.status,
        //     role: "1",
        //     phone: userinfo.phone,
        //     mail: userinfo.mail,
        //     lastLoginTime: new Date().toISOString(),
        //     lastLoginIP: "",
        //     school: userinfo.school,
        //     uid: uid
        // });
    }

    return await UserModel.create(userinfo);
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
    let pageSize = parseInt(info.pageSize);
    let pageId = Math.max(parseInt(info.currentPage) - 1, 0);
    let condition = info.school === "" ? {} : { "school": info.school }

    let students = await StudentModel.find(condition).limit(pageSize).skip(pageSize * pageId);

    if (students) {
        return students;
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

StudentDao.prototype.updateStudents = async (students, levels, groupInfo) => {
    // groupInfo = {id:"",name:""}
    let sids = [];
    students.forEach(student => {
        sids.push(student.id);
    })

    console.log(sids)
    return await StudentModel.update(
        { "_id": { $in: sids } },
        { "articleLevel": levels, "group": groupInfo }
    );
}

StudentDao.prototype.getById = async id => {
    return await StudentModel.findOne({ "_id": id });
}

StudentDao.prototype.cancelClass = async studentIds => {
    // console.log("要清空的ids", studentIds);
    return await StudentModel.findOneAndUpdate({ "_id": { $in: studentIds } }, { "group": "" });
}
module.exports = StudentDao;