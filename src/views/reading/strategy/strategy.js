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
var containers;
var allSentenceAudios;
var allSentenceIndex;
/** 设置原始数据*/
Strategy.prototype.setOrigin = o => {
    origin = o;
    html = new HtmlGenerate();
    analyser();
}

Strategy.prototype.getAllContainer = () => {
    containers = [];
    return containers;
}

/**返回 带有样式的div，插入到pageContent的内容区域*/
Strategy.prototype.getAllContentDiv = () => {
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
    return allSentenceAudios || {};
}

Strategy.prototype.getAllSentenceIndex = () => {
    return allSentenceIndex || [];
}

function analyser() {
    let regions = origin.regions;
    wordAudios = {};
    imagesDiv = [];
    contentDiv = [];
    allSentenceAudios = {};
    allSentenceIndex = [];
    // 所有的句子， 里面存的是数组，[["hello", "world"],["My","name","is","LiLei"]]
    var aSentences = [];
    regions.forEach(ele => {
        // 布局
        let layout = ele.layout;
        var pdiv = html.generContainer(layout);
        // 如果是图片的
        if (ele.image) {
            // imagesDiv.push();
            pdiv.appendChild(html.generImages(ele.image));
            contentDiv.push(pdiv);
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
                    let trigger = sentence.trigger;
                    if (trigger) {
                        if (trigger.question_id) {
                            // 一个特殊标记
                            awords.push("~!tai_" + trigger.question_id);
                        }
                    }
                    aSentences.push(awords);
                    pdiv.appendChild(html.generSentences(awords, sentence.textFont, wordAudios, sentence.sentence));
                })
                contentDiv.push(pdiv);
            })
        }
    });

    let sentences2 = origin.sentences;
    sentences2.forEach(sentence => {
        allSentenceAudios[sentence.id] = sentence.audio;
        allSentenceIndex.push(sentence.id);

    })
}

// module.exports = Strategy;
export default Strategy;