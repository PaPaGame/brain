var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    _id: String,
    id: String,
    fullTitle: String,
    dirName: String,
    part: String,
    level: Number,
    lexile: Number,
    createTime: Date,
    updateTime: Date,
    layoutType: String,
    status: String
});

mongoose.model("article", articleSchema, "article");