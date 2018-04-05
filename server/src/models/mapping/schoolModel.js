import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    name: String,
    code: String,
    status: String,
    staff: SchemaTypes.ObjectId,
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

mongoose.model("school", schoolSchema, "school");