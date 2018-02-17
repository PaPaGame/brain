var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    _id: String,
    name: String,
    code: String,
    master: String,
    phone: String,
    createTime: Date,
    status: String,
    staff: Array
});

mongoose.model("school", schoolSchema, "school");