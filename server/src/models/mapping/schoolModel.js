import {
  SchemaTypes
} from 'mongoose';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
  name: String,
  code: String,
  status: String,
  masterId: SchemaTypes.ObjectId,
  staffId: Array,
}, {
  timestamps: {
    type: Number,
    default: new Date().getTime()
  }
});

mongoose.model('school', schoolSchema, 'school');
