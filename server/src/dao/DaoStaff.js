var DaoBase = require("./DaoBase");
var StaffModel = require("../models").staff;
var util = require("util");

var staff;
var StaffDao = function (staff) {
    this.staff = staff || {};
    DaoBase.call(this, this.staff);
}

util.inherits(StaffDao, DaoBase);

module.exports = StaffDao;