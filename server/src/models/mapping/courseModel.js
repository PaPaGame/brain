import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    uid: SchemaTypes.ObjectId
}, { timestamps: true });

mongoose.model("course", courseSchema, "course");