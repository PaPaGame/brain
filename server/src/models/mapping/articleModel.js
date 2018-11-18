var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @param id 文章编号
 * @param fullTitle 用于呈现显示的文章名称
 * @param dirName 文章所在文件夹
 * @param level 旧等级，约等于废弃
 * @param lexile 蓝思指数
 * @param layoutType 页面布局类型
 * @param status 课文状态
 * @param cover 课文封面图
 * @param grade 文章新等级 E1 E2
 * @param order 文章等级内序号
 */
var articleSchema = new Schema({
  id: String,
  fullTitle: String,
  dirName: String,
  // part: String,
  level: String,
  lexile: Number,
  layoutType: String,
  status: String,
  cover: String,
  grade: Number,
  order: Number
}, {
  timestamps: {
    type: Number,
    default: new Date().getTime()
  }
});

mongoose.model('article', articleSchema, 'article');