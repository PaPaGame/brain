var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    id: String,
    fullTitle: String,
    dirName: String,
    // part: String,
    level: String,
    lexile: Number,
    layoutType: String,
    status: String,
    cover: String
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

mongoose.model("article", articleSchema, "article");