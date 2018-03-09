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
    console.log(articles.length);

    var courses = [];

    articles.forEach(ele => {
        let course = new CourseModel({
            cid: ele._id,
            uid: userinfo["id"]
        });
        courses.push(course);
    });

    // 判断是否已经存在 文章，如果不存在，插入全部， 否则逐条判断插入
    let count = await CourseModel.count({ "uid": userinfo["id"] });//

    if (count == 0) {
        return await CourseModel.insertMany(courses);
    } else {
        courses.forEach(async ele => {
            await CourseModel.findOne({ cid: ele.cid }, (err, data) => {
                if (data == null) {
                    // console.log("缺失数据，id:", ele.cid);
                    return CourseModel.create(ele);
                }
            })
        });
    }
}

CourseDao.prototype.removeByLevel = async userinfo => {
    let uid = userinfo.id;
    let articleLevel = userinfo.articleLevel;
    console.log(articleLevel);
    // 找到所有符合的文章id
    let articles = await ArticleModel.find({ "articleLevel": { $in: articleLevel } }, { $group: "_id" });
    // console.log(articles);
    var filterArticle = articles.map(ele => { return ele._id });
    // console.log(uid, filterArticle);
    return await CourseModel.deleteMany({ "uid": uid, "cid": { $in: filterArticle } });
}

module.exports = CourseDao;