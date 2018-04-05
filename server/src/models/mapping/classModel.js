import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name: String,
    school: String,
    staff: Object,
    student: Array
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

mongoose.model("class", classSchema, "class");