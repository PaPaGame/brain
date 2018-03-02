import jwt from "koa-jwt";
import CourseDao from "../dao/DaoCourse";

var CourseModel = require("../models").course;

var courseDao = new CourseDao(CourseModel);

module.exports = {};