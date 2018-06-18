import StudentDao from "../dao/DaoStudent";

var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var StaffModel = require("../models").staff;
var studentDao = new StudentDao(StudentModel);

const GetStudent = async (ctx) => {
    let message = {};
    let students = await studentDao.getAll();


    if (students) {
        message.status = 200;
        message.students = students;
    }

    ctx.body = message;
}

const GetFuzzyByName = async (ctx) => {
    let info = ctx.request.body;
    let message = {};
    if (!info) {
        message.status = 400;
        message.message = "查询参数有误";
        ctx.body = message;
        return;
    }

    // 正则忽略大小写  i
    let infos = await studentDao.findFuzzyName(info.name, info.school);

    if (infos) {
        ctx.body = {
            infos: infos,
            status: 200
        };
    }
}


const AddStudent = async (ctx) => {
    let userinfo = ctx.request.body;
    let message = {};

    // 先查询是否有这个用户名
    let checkResult = await UserModel.findOne({ "username": userinfo.username });
    if (checkResult) {
        message.status = 400;
        message.message = "账号已存在";
        ctx.body = message;

    }

    let result = await studentDao.addStudent(userinfo);

    if (result) {
        message.status = 200;
        message.message = "创建成功";
    } else {
        message.status = 400;
        message.message = "创建失败";
    }

    ctx.body = message;
}

const UpdateStudent = async (ctx) => {
    let message = {};
    let userinfo = ctx.request.body;

    console.log("更新学生", userinfo);
    let uid = userinfo._id;
    let studentResult = await studentDao.update({ "_id": uid }, { $set: userinfo });

    delete userinfo._id; // 需要删除“_id”属性， 否则在user中 会被认为重复属性
    let userResult = await UserModel.update({ "uid": uid }, { $set: userinfo });

    if (userResult) {
        message.status = 200;
        message.message = "数据更新成功";
    } else {
        message.status = 400;
    }

    ctx.body = message;
}

const DeleteStudent = async (ctx) => {
    let message = {};
    let userinfo = ctx.request.body;
    // 传进来的是student 表里的id  记录下来， 删除成功后再去user表里删除
    let studentResult = await studentDao.delete({ "_id": userinfo.id });

    if (studentResult) {
        let userResult = await UserModel.remove({ "uid": userinfo.id });
        if (userResult) {
            message.status = 200;
            message.message = "删除成功";
        } else {
            message.status = 400;
            message.message = "删除失败";
        }
    } else {
        message.status = 400;
        message.message = "删除失败";
    }
    ctx.body = message;
}

const GetById = async (ctx) => {
    let userinfo = ctx.request.body;
    let message = {};
    // console.log(userinfo);
    let basicInfo = {};
    let result = await studentDao.getById(userinfo.id);

    // basicInfo = result;

    let userResult = await UserModel.findOne({ "uid": userinfo.id });
    if (userResult) {
        basicInfo.mail = userResult.mail;
        basicInfo.phone = userResult.phone;
        basicInfo.status = userResult.status;
    }

    basicInfo._id = result._id;
    basicInfo.group = result.group;
    basicInfo.articleLevel = result.articleLevel == null ? [] : result.articleLevel;
    basicInfo.school = result.school;
    basicInfo.status = result.status;
    basicInfo.username = result.username;

    if (basicInfo) {
        message.status = 200;
        message.info = basicInfo;
    } else {
        message.status = 400;
        message.message = `未找到id为${userinfo.id}的学生`;
    }

    ctx.body = message;
}

const UpdateArticleLevel = async ctx => {
    let articleInfo = ctx.request.body;
    let message = {};
    let user = await studentDao.getById(articleInfo.id);

    if (!user) {
        message.status = 400;
        message.message = "未查到指定学生";
        ctx.body = message;
        return;
    }

    let result = await studentDao.updateArticleLevel(articleInfo);
    if (!result) {
        message.status = 400;
        message.message = "更新失败";
        ctx.body = message;
        return;
    }

    message.status = 200;
    message.message = "更新成功";
    ctx.body = message;

}

const GetAllStudent = async ctx => {
    let message = {};
    let info = ctx.request.body;
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await studentDao.getAllStudent(info);
    let count = await studentDao.countByQuery({});
    if (result) {
        message.status = 200;
        message.students = result;
        message.count = count;
    } else {
        message.status = 400;
        message.message = "查询失败";
    }

    ctx.body = message;
}

const GetStudentByClassId = async ctx => {
    let message = {};
    let userinfo = ctx.request.body;
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    console.log("班级id", userinfo.id);
    let result = await studentDao.getByQuery({ "group.id": userinfo.id });
    let count = await studentDao.countByQuery({ "group.id": userinfo.id });
    if (result) {
        message.status = 200;
        message.students = result;
        message.count = count;
    } else {
        message.status = 400;
        message.message = "查询失败";
    }

    ctx.body = message;
}

const GetCourseData = async ctx => {
    let message = {};
    let userinfo = ctx.request.body;
    if (!userinfo) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    // 查询所有符合条件的学生
    // 老师的id
    let id = ctx.state.user.id;
    let staff = await UserModel.findOne({ "_id": id });
    if (!staff) {
        message.status = 400;
        message.message = "未查找到相关用户信息";
        ctx.body = message;
        return;
    }
    console.log("staff:", staff);
    let staffId = staff.uid;
    let staffObj = await StaffModel.findOne({ "_id": staffId });
    if (!staff) {
        message.status = 400;
        message.message = "未查找到相关用户信息";
        ctx.body = message;
        return;
    }
    let groups = staffObj.group;
    let allStudent = await StudentModel.find({ "group.id": { $in: groups } });
    let studentIds = [];
    allStudent.forEach(student => {
        studentIds.push(student._id);
    })
    // console.log(allStudent, groups);
    console.log(studentIds);

    // 查询每个学生的tai

    // 查询每个学生的quiz

    // 查询每个学生的record
}

module.exports = {
    GetFuzzyByName,
    AddStudent,
    UpdateStudent,
    DeleteStudent,
    // GetStudent,
    GetById,
    UpdateArticleLevel,
    GetAllStudent,
    GetStudentByClassId,
    GetCourseData
}