import ArticleDao from '../dao/DaoArticle';

var ArticleModel = require('../models').article;

var articleDao = new ArticleDao(ArticleModel);

const Create = async (ctx) => {

};

const Update = async (ctx) => {

};

const Delete = async (ctx) => {
 
};

const GetByID = async (ctx) => {
  let id = ctx.params['id'];
  console.log(ctx.params['id']);
  // find all
  if (!!!id) {
    console.log('查找所有文章');
    ctx.body = await articleDao.getAll((err, data) => {
      console.log(data);
    });
  } else {
    console.log(`查找编号为${id}的文章`);
    ctx.body = await articleDao.getById(id, (err, data) => {
      console.log(data);
    });
  }
};

const GetByLevel = async (ctx) => {
  let level = ctx.params['level'];
  if (!!level) {
    articleDao.getByLevel(level, (err, data) => {
      if (err)
        console.log(err);

      console.log(data);
    });
  }
};

const GetLevelList = async ctx => {
  let message = {};
  let result = await articleDao.getLevelList();

  if (result) {
    message.status = 200;
    message.list = result;
  } else {
    message.status = 400;
    message.message = '获取文章级别列表失败';
  }

  ctx.body = message;
};

const GetArticleList = async ctx => {
  let queryInfo = ctx.request.body;
  let message = {};
  if (!queryInfo) {
    message.status = 400;
    message.message = '参数错误';
    ctx.body = message;
    return;
  }

  let result = await articleDao.getArticleList(queryInfo);
  if (!result) {
    message.status = 400;
    message.message = '查询文章列表失败';
  } else {
    message.status = 200;
    message.list = result;
  }

  ctx.body = message;
};

module.exports = {
  Create,
  Update,
  Delete,
  GetByID,
  GetByLevel,
  GetLevelList,
  GetArticleList
};