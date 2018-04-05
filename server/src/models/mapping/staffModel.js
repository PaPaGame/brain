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
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

mongoose.model("staff", staffSchema, "staff");