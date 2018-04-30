/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} m 
 */
function DaoBase(m) {
    model = m;
}

var model;
/** 创建*/
DaoBase.prototype.create = async function (doc) {
    console.log("Base 创建", model);
    return await model.create(doc);
};

/** 根据id查找*/
DaoBase.prototype.getById = async function (id) {
    return await model.findOne({ _id: id });
};

/** 数量*/
DaoBase.prototype.countByQuery = async function (query) {
    return await model.find(query);
};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = async function (query, fileds, opt) {
    return await model.find(query, fileds, opt);
};

DaoBase.prototype.getAll = async function () {
    return await model.find({}, null, { sort: { "createdAt": -1 } });
};

/** 删除*/
DaoBase.prototype.delete = async function (query) {
    return await model.remove(query);
}

/** 更新*/
DaoBase.prototype.update = async function (conditions, update, options) {
    console.log(model, conditions, update, options);
    return await model.update(conditions, update, options);
}

module.exports = DaoBase;