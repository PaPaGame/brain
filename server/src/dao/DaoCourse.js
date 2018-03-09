var DaoBase = require("./DaoBase");
var CourseModel = require("../models").course;
var util = require("util");

var StudentModel = require("../models").student;
var ArticleModel = require("../models").article;
var course;
var CourseDao = function (cm) {
    course = new cm();
    DaoBase.call(this, this.course);
}

util.inherits(CourseDao, DaoBase);

CourseDao.prototype.addCourse = async userinfo => {
    // 1、通过username 或者 用户id 查询出articleLevel
    // 2、根据articleLevel 查询article表， 找到文章集合
    // 3、再course表创建数据

    let student = await StudentModel.findOne({ "_id": userinfo["id"] });
    let articleLevel = student.articleLevel;
    // console.log(articleLevel);
    let articles = await ArticleModel.find({ "articleLevel": { $in: articleLevel } });
    // console.log(articles.length);

    // let course = new CourseModel()
    var courses = [];

    articles.forEach(ele => {
        let course = new CourseModel({
            cid: ele._id,
            uid: userinfo["id"]
        });
        courses.push(course);
    });

    return await CourseModel.insertMany(courses);
}

module.exports = CourseDao;