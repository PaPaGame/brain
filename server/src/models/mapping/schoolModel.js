import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    name: String,
    code: String,
    status: String,
    staff: SchemaTypes.ObjectId,
}, { timestamps: true });

mongoose.model("school", schoolSchema, "school");