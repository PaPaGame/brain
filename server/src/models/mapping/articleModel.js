var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    id: String,
    fullTitle: String,
    dirName: String,
    part: String,
    level: Number,
    lexile: Number,
    layoutType: String,
    status: String
}, { timestamps: true });

mongoose.model("article", articleSchema, "article");