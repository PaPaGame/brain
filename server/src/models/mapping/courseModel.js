import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

/** 
 * @param cid 课文id
 * @param uid 学生id
 * @param taiState 灯泡答题状态，未开始，已答完(0、1)
 * @param taiAccuracy 灯泡正确率 0~~1
 * @param taiAnswer
 * @param taiCount
 * @param quizState 问答状态，未开始，答题中，已答完
 * @param quizCurrent 问答状态， 当前答第几题
 * @param quizAccuracy 问答回答正确率 0~~1
 * @param quizCount 问答题目总数
 * @param quizAnswer 该篇课文回答的状态的 答案列表
 * @param recordIds 记录录音的数组
 * @param recordScore 该篇文章的录音数字得分
 * @param recordComment 该篇文章的录音评语
 * @param courseState 根据tai，record， quiz 计算出文章的完成状态
*/
var courseSchema = new Schema({
    cid: SchemaTypes.ObjectId,
    courseState: { type: Number, default: 0 },
    uid: SchemaTypes.ObjectId,
    taiState: { type: String, default: "" },
    taiAccuracy: { type: Number, default: 0 },
    taiAnswer: { type: Array, default: [] },
    taiCount: { type: Number, default: 0 },
    quizState: { type: Number, default: 0 },
    quizCurrent: { type: Number, default: 0 },
    quizAccuracy: { type: Number, default: 0 },
    recordIds: { type: Array, default: [] },
    recordScore: { type: Number, default: 0 },
    recordComment: { type: String, default: "" },
    quizCount: { type: Number, default: 0 },
    quizAnswer: { type: Array, default: [] }
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

mongoose.model("course", courseSchema, "course");