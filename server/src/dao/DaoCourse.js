var mongoose = require("mongoose");
var DaoBase = require("./DaoBase");
var CourseModel = require("../models").course;
var util = require("util");

var StudentModel = require("../models").student;
var ArticleModel = require("../models").article;
var courseModel;
var CourseDao = function (cm) {
    courseModel = new cm();
    DaoBase.call(this, cm);
}

util.inherits(CourseDao, DaoBase);

CourseDao.prototype.addCourse = async userinfo => {
    // 1、通过username 或者 用户id 查询出articleLevel
    // 2、根据articleLevel 查询article表， 找到文章集合
    // 3、再course表创建数据

    let student = await StudentModel.findOne({ "_id": userinfo["id"] });
    let articleLevel = student.articleLevel;
    console.log(student, articleLevel);
    // console.log(articleLevel);
    let articles = await ArticleModel.find({ "articleLevel": { $in: articleLevel } });

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
            let result = await CourseModel.findOne({ cid: ele.cid, uid: ele.uid }, (err, data) => {
                // if (data == null) {
                //     // console.log("缺失数据，id:", ele.cid);
                //     return CourseModel.create(ele);
                // }
            });

            if (!result) {
                return await CourseModel.create(ele);
            }
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

CourseDao.prototype.answerTai = async userinfo => {
    let uid = userinfo.uid;
    let cid = userinfo.cid;
    let accuracy = userinfo.accuracy;
    return await CourseModel.findOneAndUpdate({ "uid": uid, "cid": cid }, { "taiAccuracy": accuracy, "taiState": 1 });
}

CourseDao.prototype.answerQuiz = async userinfo => {
    let uid = userinfo.uid;
    let cid = userinfo.cid;
    let currentIndex = userinfo.currentIndex; // 0：未开始，1，2，3 答题序号， -1 全部打完
    let quizCount = userinfo.quizCount; // 题目总数
    let userQuiz = userinfo.quiz;// 某一题的答题详情 {quizId:123,result:true|false}

    if (currentIndex != -1) {
        return await CourseModel.findOneAndUpdate({ "uid": uid, "cid": cid },
            {
                $push: { "quizAnswer": userQuiz },
                "quizCurrent": currentIndex,
                "quizCount": quizCount,
                "quizState": 1
            });
    } else {
        // 最终答完了
        let course = await CourseModel.findOne({ "uid": uid, "cid": cid });
        console.log("单条课程信息", course);
        if (course.quizAccuracy !== 0) {
            return null;
        }
        let quizAnswers = course.quizAnswer;
        let correctCount = quizAnswers.map(ele => { return ele.result == true }).length;
        let quizCount = course.quizCount;
        return await CourseModel.findOneAndUpdate({ "uid": uid, "cid": cid }, {
            $push: { "quizAnswer": userQuiz },
            "quizCurrent": currentIndex,
            "quizCount": quizCount,
            "quizAccuracy": correctCount / quizCount,
            "quizState": 2
        });
    }
}

CourseDao.prototype.getCourse = async userinfo => {
    let uid = userinfo.uid;
    return await CourseModel.aggregate([{
        $match: {
            "uid": new mongoose.Types.ObjectId(uid)
        }
    }, {
        $lookup: {
            from: "article",
            localField: "cid",
            foreignField: "_id",
            as: "article"
        }
    }, {
        $sort: {
            "courseState": -1,
            "cid": -1,
            "quizAccuracy": -1
        }
    }]);
}
module.exports = CourseDao;