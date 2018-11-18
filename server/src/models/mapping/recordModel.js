import {SchemaTypes} from 'mongoose';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** 
 * @param cid 对应哪篇文章
 * @param uid 对应哪个学生
 * @param recordName 录音名字
*/
var recordSchema = new Schema({
  cid: SchemaTypes.ObjectId,
  uid: SchemaTypes.ObjectId,
  recordName: String
}, {
  timestamps: {
    type: Number,
    default: new Date().getTime()
  }
});


mongoose.model('record', recordSchema, 'record');