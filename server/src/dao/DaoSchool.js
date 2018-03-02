var mongoose = require("mongoose");
// mongoose.model("school")
var DaoBase = require("./DaoBase");
var SchoolModel = require("../models").school;
var util = require("util");

var school;
var SchoolDao = function (school) {
    this.school = school || {};
    DaoBase.call(this, this.school);
}

util.inherits(SchoolDao, DaoBase);

/**
 * 管理员获取所有学校列表
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

module.exports = SchoolDao;