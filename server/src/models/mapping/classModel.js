var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
  name: String,
  school: String,
  staff: Object,
  student: Array,
  articleLevel: Array
}, {
  timestamps: {
    type: Number,
    default: new Date().getTime()
  }
});

mongoose.model('class', classSchema, 'class');
