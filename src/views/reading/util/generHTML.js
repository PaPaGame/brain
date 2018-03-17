function GenerHtml() {

}

GenerHtml.prototype.generSentences = (layout, words) => {
    // var div = new HTMLDivElement();
    var div = document.createElement("div");
    var content = "<div class='paragraphs'>";
    words.forEach(word => {
        content += word + " ";
    })
    content += "</div>";
    div.innerHTML = content;
    return div;
}

GenerHtml.prototype.generImages = (layout, images) => {
    // var img = new HTMLImageElement();
}

module.exports = GenerHtml;