// const config = require("../../config/config");
import config from '../../config/config';
import Role from '../constants/RoleType';
import UserDao from '../dao/DaoUser';
const jwt = require('jsonwebtoken');

var UserModel = require('../models').user;
var SchoolModel = require('../models').school;
var ClassModel = require('../models').class;
var StaffModel = require('../models').staff;

var userDao = new UserDao(UserModel);

const Exist = async (ctx) => {
  let info = ctx.request.body;
  let result = await userDao.findByUsername(info);

  ctx.body = {
    status: 200,
    exist: result !== null,
  };
};

const Create = async (ctx) => {
  let info = ctx.request.body;
  let result = userDao.create(info, (err, data) => {
    if (err)
      console.log(err);
  });

  if (result)
    ctx.body = {
      status: 200
    };
};

const Update = async (ctx) => {
  let info = ctx.request.body;
  let result = await userDao.update({
    _id: `${info._id}`
  }, {
    $set: info
  }, null, err => {
    if (!!err) {
      console.log(err);
    }
  });

  if (result) {
    ctx.body = {
      status: 200
    };
  }
};

const Delete = async (ctx) => {
  let data = ctx.request.body;
  let result = userDao.delete({
    _id: `${data._id}`
  }, err => {
    if (!!err)
      console.log(`${err}`);
  });

  if (result) {
    ctx.body = {
      status: 200
    };
  }

};

var user;
const Get = async function (ctx) {
  // let code = ctx.params['code'];
  let result = await userDao.getAll((err, data) => {

  });

  if (result) {
    ctx.body = {
      status: 200,
      users: result
    };
  }
};

const Login = async function (ctx) {
  let message = {};
  let userInfo = ctx.request.body;

  if (!userInfo) {
    message.status = 400;
    message.message = '登录信息出错';
    ctx.body = message;
    return;
  }

  let result = await userDao.findByUsername(userInfo);

  if (!result) {
    message.status = 400;
    message.message = '查无此用户';
    ctx.body = message;
    return;
  }

  if (UserModel.authenticate(result.hash_password, userInfo.password)) {
    let newtoken = {};
    newtoken.id = result._id;
    newtoken.role = result.role;
    newtoken.school = result.school;
    const token = jwt.sign(newtoken, config.tokenSecret, {
      expiresIn: '1d'
    });
    // 如果验证通过了的话，把token啊 什么的 都传给客户端
    message.status = 200;
    message.userinfo = result;
    message.token = token;
  } else {
    message.message = '密码不正确';
    message.status = 400;
  }

  ctx.body = message;
};

const GetUserInfo = async (ctx) => {
  // console.log(ctx.request.header);
  let token = ctx.header.authorization;
  let obj = jwt.decode(token.split(' ')[1]);
  console.log(obj);
  let user = ctx.request.body;
  console.log('获取用户信息', user);
  let result = await UserModel.findOne({
    '_id': obj.id
  }); // await userDao.findByUsername(user, (err, data) =>{});

  if (result) {
    ctx.body = {
      status: 200,
      userinfo: result
    };
  }
};


const Logout = async (ctx) => {
  await ctx.redirect('/login');
};

//  修改密码
const ChangePassword = async ctx => {
  let userinfo = ctx.request.body;
  let message = {};
  if (!userinfo) {
    message.status = 400;
    message.message = '用户信息错误';
  }

  let result = await userDao.changePassword(userinfo);
  if (!result) {
    message.status = 400;
    message.menubar = '修改密码失败';
  }

  message.status = 200;
  message.menubar = '修改密码成功';
  ctx.body = message;
};

const DashboardInfoData = async ctx => {
  let user = ctx.request.body;
  let message = {};

  if (!user) {
    message.status = 400;
    message.message = '用户信息错误';
    ctx.body = message;
    return;
  }

  let userinfo = await UserModel.findOne({
    '_id': user.id
  });

  if (!userinfo) {
    message.status = 400;
    message.message = '用户信息不存在';
    ctx.body = message;
    return;
  }

  switch (userinfo.role) {
  case Role.STUDENT:
  {
    message.status = 200;
    message.info = [1, 2, 3, 4];
    break;
  }
  case Role.STAFF:
  {
    message.status = 200;
    message.info = [5, 6, 7];
    let userInfoResult = await UserModel.findOne({
      '_id': userinfo.id
    });
    if (!userInfoResult) {
      message.status = 400;
      message.message = '查询用户信息出错';
      ctx.body = message;
      return;
    }
    let staffInfoResult = await StaffModel.findOne({
      '_id': userinfo.uid
    });
    console.log(staffInfoResult);
    let staffGroupCount = staffInfoResult.group.length;
    let studentCount = 0;
    // 老师名下有班级，才有查的必要
    if (staffGroupCount !== 0) {
      let classes = await ClassModel.find({
        'staff.id': userinfo.id
      });
      classes.forEach(classInfo => {
        studentCount += classInfo.student.length;
      });
    }

    message.status = 200;
    message.info = [staffGroupCount, studentCount, -1];
    break;
  }
  case Role.MASTER:
  {
    let school = user.school;
    if (school === '') {
      message.status = 400;
      message.message = '学校码不对';
      break;
    }

    let id = user.id;
    let classCount = await ClassModel.find({
      'school': school
    }).distinct('name').count();
    let studentCount = await UserModel.count({
      'school': school
    });
    let newStudentCount = await UserModel.count({
      'role': Role.STUDENT,
      createdAt: {
        '$lt': new Date(),
        '$gt': new Date(new Date() - 7 * 24 * 3600 * 1000)
      },
      'school': school
    });
    // let dieStudentCount = await StudentModel.count({
    //     "role": Role.STUDENT, createdAt: {
    //         "$lt": new Date(),
    //         "$gt": new Date(new Date() - 15 * 24 * 3600 * 1000)
    //     },
    //     "school":school
    // });
    let dieStudentCount = 0;
    message.status = 200;
    message.info = [classCount, studentCount, newStudentCount, dieStudentCount];
    break;
  }
  case Role.ADMIN:
  {
    // 查找学校数量
    let schoolCount = await SchoolModel.distinct('code').count();
    let staffCount = await UserModel.count({
      'role': {
        $ne: Role.STUDENT
      }
    });
    let studentCount = await UserModel.count({
      'role': Role.STUDENT
    });
    let newStudentCount = await UserModel.count({
      'role': Role.STUDENT,
      createdAt: {
        '$lt': new Date(),
        '$gt': new Date(new Date() - 15 * 24 * 3600 * 1000)
      }
    });

    message.status = 200;
    message.info = [schoolCount, staffCount, studentCount, newStudentCount];
    // console.log(`school:${schoolCount}, staff:${staffCount},student:${studentCount},newStudent:${newStudentCount}`);
    break;
  }
  }

  ctx.body = message;

};

module.exports = {
  Create,
  Update,
  Delete,
  Get,
  Login,
  Exist,
  GetUserInfo,
  Logout,
  ChangePassword,
  DashboardInfoData
};
