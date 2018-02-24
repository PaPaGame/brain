import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name: String,
    school: String,
    staff: Object,
    student: Object
}, { timestamps: true });

mongoose.model("class", classSchema, "class");