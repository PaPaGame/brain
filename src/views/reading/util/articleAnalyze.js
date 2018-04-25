// 文章解析
function ArticleAnalyze() {
}

// 解析基础数据
ArticleAnalyze.prototype.startBasicInfo = (originData) => {
    // 传进来的就是obj
    console.log(originData);
    let result = {};
    // 解析标题
    result.title = originData.full_title;

    result.dirName = originData.dirName;

    result.pages = [];
    // 解析 文章内容
    let pages = originData.pages;
    pages.forEach(ele => {
        result.pages.push(ele.id);
    })

    // 解析灯泡
    result.tais = [];
    let tais = originData.tai;
    tais.forEach(ele => {
        result.tais.push(ele.id);
    });

    // 解析名词解释
    result.glossaries = {};
    let glossaries = originData.glossaries;
    glossaries.forEach(ele => {
        let word = ele.word;
        result.glossaries[word] = ele;
    });

    return result;
}

// 解析quiz
ArticleAnalyze.prototype.startQuizs = (originData) => {
    let result = [];
    originData.forEach(ele => {
        result.push(ele.id.toString());
    })
    return result;
}

// 解析question  包括灯泡 和quiz
ArticleAnalyze.prototype.startQuestion = (originData) => {
    let result = {};
}

module.exports = ArticleAnalyze;