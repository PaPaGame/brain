var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    name: String,
    code: String,
    master: String,
    phone: String,
    createTime: Date,
    status: String,
    staff: Array,
}, { timestamps: true });

mongoose.model("school", schoolSchema, "school");