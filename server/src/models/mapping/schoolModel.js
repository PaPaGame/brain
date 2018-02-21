import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    name: String,
    code: String,
    master: String,
    phone: String,
    createTime: Date,
    status: String,
    staff: Array,
}, { timestamps: true });

mongoose.model("school", schoolSchema, "school");