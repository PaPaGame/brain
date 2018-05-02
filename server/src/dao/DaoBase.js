/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} m 
 */
function DaoBase(m) {
    //http://www.davidmclifton.com/2011/07/21/javascript-objects-and-inheritance/
    // 在这找到的解决方案， 不一定是最佳的
    // @date 2018-05-01 23:36:38
    this.model = m;
}

/** 创建*/
DaoBase.prototype.create = async function (doc) {
    console.log("Base 创建", model);
    return await this.model.create(doc);
};

/** 根据id查找*/
DaoBase.prototype.getById = async function (id) {
    return await this.model.findOne({ _id: id });
};

/** 数量*/
DaoBase.prototype.countByQuery = async function (query) {
    return await this.model.count(query);
};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = async function (query, fileds, opt) {
    return await this.model.find(query, fileds, opt);
};

DaoBase.prototype.getAll = async function () {
    return await this.model.find({}, null, { sort: { "createdAt": -1 } });
};

/** 删除*/
DaoBase.prototype.delete = async function (query) {
    console.log("BASE", this.model.modelName);
    return await this.model.remove(query);
}

/** 更新*/
DaoBase.prototype.update = async function (conditions, update, options) {
    console.log(model, conditions, update, options);
    return await this.model.update(conditions, update, options);
}

DaoBase.prototype.getModel = () => {
    return this.model;
}

module.exports = DaoBase;