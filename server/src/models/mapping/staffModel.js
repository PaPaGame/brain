import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var staffSchema = new Schema({
    name: String,
    mail: String,
    phone: String,
    lastLoginTime: Date,
    school: String,
    group: Array,
    status: String
}, { timestamps: true });

mongoose.model("staff", staffSchema, "staff");