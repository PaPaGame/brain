import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

/** 
 * @param cid 课程id
 * @param uid 学生id
 * @param taiState 灯泡答题状态，未开始，答题中，已答完
 * @param taiAccuracy 灯泡正确率 0~~1
 * @param quizState 问答状态，未开始，答题中，已答完
 * @param quizAccuracy 问答回答正确率 0~~1
 * @param recordId 记录录音的数组
 * @param recordScore 该篇文章的录音数字得分
 * @param recordComment 该篇文章的录音评语
 * @param courseState 根据tai，record， quiz 计算出文章的完成状态
*/
var courseSchema = new Schema({
    cid: SchemaTypes.ObjectId,
    uid: SchemaTypes.ObjectId,
    taiState: String,
    taiAccuracy: Number,
    quizState: String,
    quizAccuracy: Number,
    recordId: Array,
    recordScore: Number,
    recordComment: String,
    courseState: String
}, { timestamps: true });


mongoose.model("course", courseSchema, "course");