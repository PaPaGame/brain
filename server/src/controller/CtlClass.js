import ClassDao from "../dao/DaoClass";
import CourseDao from "../dao/DaoCourse";
import ArticleDao from "../dao/DaoArticle";
import StudentDao from "../dao/DaoStudent";

var ClassModel = require("../models").class;
var CourseModel = require("../models").course;
var ArticleModel = require("../models").article;
var StudentModel = require("../models").student;

var classDao = new ClassDao(ClassModel);
var courseDao = new CourseDao(CourseModel);
var articleDao = new ArticleDao(ArticleModel);
var studentDao = new StudentDao(StudentModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
    let message = {};
    await classDao.create(info);
    console.log("创建班级，班级信息为：", info);
    let existClass = await ClassModel.findOne({ name: info.name });

    if (existClass) {
        message.status = 400;
        message.message = "班级名称已经存在，重新录入";
        ctx.body = message;
        return;
    }

    let result = await classDao.create(info);

    if (result) {
        ctx.body = { status: 200 };
    }
};
const Update = async (ctx) => {
    let info = ctx.request.body;

    let message = {};
    if (!info) {
        message.status = 400;
        message.message = "参数信息不正确";
        return;
    }

    console.log("更新班级，班级信息为：", info);
    if (info.staff) {
        let staff = { id: info.staff.id, name: info.staff.name };
        info.staff = staff;
    }

    if (!info.student) {
        info.student = [];
    }
    // 更新班级信息
    let result = await classDao.updateClassInfo(info);
    // 找到所有匹配的文章信息
    let students = info.student;
    let levels = info.articleLevel;
    // let articles = await articleDao.getByLevels(levels);
    // 更新学生表
    let studentResult = await studentDao.updateStudentsLevels(students, levels);
    // console.log("难度：", levels, "列表：", articles);
    // 更新课程表
    console.log("现在准备更新课程表了！！！学生", students);
    let courseResult = await students.forEach(s => {
        courseDao.addCourse(s);
    });
    // let courseResult = await courseDao.updateCourses(students, articles);

    if (courseResult) {
        message.status = 200;
    } else {
        message.status = 400;
    }

    ctx.body = message;
};
const Delete = async (ctx) => {
    let info = ctx.request.body;
    let message = {};
    if (!info) {
        message.status = 400;
        message.message = "参数不正确";
        ctx.body = message;
        return;
    }
    console.log(info);
    let result = await classDao.delete(info.id);

    if (result)
        ctx.body = { status: 200 };
};
const GetClass = async (ctx) => {
    let info = ctx.request.body;
    let message = {};

    console.log(info);
    let query;
    if (info.school == "") {
        query = {};
    } else {
        query = { school: info.school };
    }

    let result = await classDao.getClassList(query);

    if (!result) {
        message.status = 400;
        message.message = "查询班级失败";
        ctx.body = message;
        return;
    }

    message.status = 200;
    message.class = result;
    ctx.body = message;
};

const GetFuzzyGroups = async ctx => {
    let message = {};
    let info = ctx.request.body;
    console.log("aaaa", info);
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
        ctx.body = message;
        return;
    }

    let result = await ClassModel.find({ "name": { $regex: info.name, $options: 'i' } });

    message.status = 200;
    message.group = result ? result : [];
    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Delete,
    GetClass,
    GetFuzzyGroups
};