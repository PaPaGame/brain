import CourseDao from '../dao/DaoCourse';
import UserDao from '../dao/DaoUser';
import RecordDao from '../dao/DaoRecord';
import FileSaver from '../utils/fileSaver';

var CourseModel = require('../models').course;
var UserModel = require('../models').user;
var RecordModel = require('../models').record;

var courseDao = new CourseDao(CourseModel);
var userDao = new UserDao(UserModel);
var recordDao = new RecordDao(RecordModel);

// 根据学生id 找到 对应的文章等级列表再去文章表找到所有的文章，再插入到课程表内
const AddCourse = async ctx => {
  let message = {};
  let userinfo = ctx.request.body;
  if (!userinfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }
  await courseDao.addCourse(userinfo);
  message.status = 200;
  message.message = '添加成功';
  ctx.body = message;
};

// 根据文章等级和用户id 删除课程表内的 课程数据
const RemoveCourseByLevel = async ctx => {
  let message = {};
  let userinfo = ctx.request.body;
  if (!userinfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }

  await courseDao.removeByLevel(userinfo);
};

// 回答灯泡
const AnswerTai = async ctx => {
  let message = {};
  let userinfo = ctx.request.body;

  let uid = ctx.state.user.id;
  // userinfo: user._id; 课程id, 正确率
  if (!userinfo || !uid) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }

  let course = await courseDao.getCourseByUidAndCid(uid, userinfo.cid);

  // console.log("查询结果", course);
  let answers = course.taiAnswer;
  let answer = userinfo.answer;
  if (answers.length === 0) {
    answers.push(answer);
  } else {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].id === answer.id) {
        answers[i].result = answer.result;
      }
    }
  }
  let result = await courseDao.answerTai(course.uid, userinfo.cid, answers, userinfo.taiCount);
  if (result) {
    message.status = 200;
    message.message = 'tai修改成功';
    ctx.body = message;
  }
};

const AnswerQuiz = async ctx => {
  let userinfo = ctx.request.body;
  let message = {};
  if (!userinfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }

  let result = await courseDao.answerQuiz(userinfo);
  if (result) {
    message.status = 200;
    message.message = 'quiz修改成功';
    ctx.body = message;
  }
};

const GetCourse = async ctx => {
  let message = {};
  let userinfo = ctx.request.body;
  if (!userinfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }

  // user表信息
  let user = await userDao.getUserInfo(userinfo.uid);
  let result = await courseDao.getCourse({
    uid: user.uid
  });
  if (result) {
    message.status = 200;
    message.message = '获取成功';
    message.courses = result;
    ctx.body = message;
  }
};

const SendRecord = async ctx => {
  let message = {};
  let recordInfo = ctx.request.body;
  if (!recordInfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }


  // let saver = new FileSaver();
  // saver.uid = recordInfo.uid;
  // saver.cid = recordInfo.cid;
  // saver.content = recordInfo.file;
  // let result = await saver.save();
  // // 如果保存数据成功的话，讲记录存到数据库
  // if (result) {
  await recordDao.create(recordInfo);
  // }
  message.status = 200;
  ctx.body = message;
};

module.exports = {
  AddCourse,
  RemoveCourseByLevel,
  AnswerTai,
  AnswerQuiz,
  GetCourse,
  SendRecord
};
