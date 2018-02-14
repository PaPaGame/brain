/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} Model 
 */
function DaoBase(Model) {
    this.model = Model;
}

/** 创建*/
DaoBase.prototype.create = (doc, callback) => {
    this.model.create(doc, (err, data) => {
        if (err)
            callback(err, null);

        return callback(null, data);
    });
};

/** 根据id查找*/
DaoBase.prototype.getById = (id, callback) => {
    this.model.findOne({ _id: id }, (err, data) => {
        if (err)
            callback(err, null);

        return callback(null, data);
    })
};

/** 数量*/
DaoBase.prototype.countByQuery = (query, callback) => {
    this.model.find(query, (err, data) => {
        if (err)
            callback(err, null);
        return callback(null, data);
    });
};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = (query, fileds, opt, callback) => {
    this.model.find(query, fileds, opt, (err, data) => {
        if (err)
            callback(err, null);
        return callback(null, data);
    });
};

DaoBase.prototype.getAll = (callback) => {
    this.model.find({}, (err, data) => {
        if (err)
            callback(err, null);

        return callback(null, data);
    });
};

/** 删除*/
DaoBase.prototype.delete = (query, callback) => {
    this.model.remove(query, err => {
        if (err)
            callback(err);
        return callback(null);
    });
}

/** 更新*/
DaoBase.prototype.update = (conditions, update, options, callback) => {
    this.model.update(conditions, update, options, err => {
        if (err)
            callback(err);
        return callback(null);
    });
}

module.exports = DaoBase;