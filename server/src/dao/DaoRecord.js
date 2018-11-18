var mongoose = require('mongoose');
// mongoose.model("school")
var DaoBase = require('./DaoBase');
// var SchoolModel = require("../models").school;
var util = require('util');

var recordModel;

function RecordDao(rm) {
  recordModel = rm;
  DaoBase.call(this, rm);
}

util.inherits(RecordDao, DaoBase);

module.exports = RecordDao;
