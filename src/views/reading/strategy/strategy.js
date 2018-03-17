import HtmlGenerate from '../util/generHTML';
/**
 * 解析策略
 * @author sol
 * @date 2018-03-17 12:03:46
 */
function Strategy() {

}

var origin;
var wordAudios;
var imagesDiv;
var contentDiv;
var html;
/** 设置原始数据*/
Strategy.prototype.setOrigin = o => {
    origin = o;
    html = new HtmlGenerate();
}

/**返回 带有样式的div，插入到pageContent的内容区域*/
Strategy.prototype.getAllContentDiv = () => {
    let regions = origin.regions;
    wordAudios = {};
    imagesDiv = [];
    contentDiv = [];
    // 所有的句子， 里面存的是数组，[["hello", "world"],["My","name","is","LiLei"]]
    var aSentences = [];
    regions.forEach(ele => {
        // 布局
        let layout = ele.layout;
        // 如果是图片的
        if (ele.image) {
            // imagesDiv.push();
            imagesDiv.push(html.generImages(layout, ele.image));
        } else {
            // 如果是文章内容的
            let paragraphs = ele.paragraphs;
            paragraphs.forEach(paragraph => {
                let sentences = paragraph.sentences;
                sentences.forEach(sentence => {
                    let awords = [];
                    let words = sentence.words;
                    words.forEach(wordObj => {
                        // 插入音频
                        wordAudios[wordObj.spelling] = wordObj.audio;

                        awords.push(wordObj.spelling);
                    });
                    let trigger = paragraph.trigger;
                    if (trigger) {
                        if (trigger.question_id) {
                            awords.push("~!tai");
                        }
                    }
                    aSentences.push(awords);
                    contentDiv.push(html.generSentences(layout, awords));
                })
            })
        }
    });

    return contentDiv;
}

Strategy.prototype.getAllImagesDiv = () => {
    return imagesDiv || [];
}

/** 返回单词的声音的一个完成对象 采用键值对的形式存放 {"hello":"1.mp3","world":"2.mp3"}*/
Strategy.prototype.getAllWordAudios = () => {
    return wordAudios || {};
}

Strategy.prototype.getAllSentenceAudios = () => {

}



// module.exports = Strategy;
export default Strategy;