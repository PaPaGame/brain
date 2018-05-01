var mongoose = require("mongoose");
// mongoose.model("school")
var DaoBase = require("./DaoBase");
var SchoolModel = require("../models").school;
var util = require("util");

var school;
var SchoolDao = function (sch) {
    school = new sch();
    DaoBase.call(this, sch);
}

util.inherits(SchoolDao, DaoBase);

/**
 * 管理员获取所有学校列表， 跟普通单表的getall不同， 这个是多表有筛选的
 * @param {*} ctx 
 * 
 */
SchoolDao.prototype.findAllSchool = async (ctx) => {
    return await mongoose.model("school").aggregate([{
        $lookup: {
            from: "staff",
            localField: "masterId",
            foreignField: "_id",
            as: "master"
        }
    }, {
        $lookup: {
            from: "staff",
            localField: "staffId",
            foreignField: "_id",
            as: "staff"
        }
    }]);
};

SchoolDao.prototype.isExist = async code => {
    return await SchoolModel.findOne({ "code": code });
}

module.exports = SchoolDao;