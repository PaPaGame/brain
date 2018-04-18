<template>
    <section class="story">
        <div class="story-panel">
            <!-- 文章具体内容 -->
            <div class="pageContent">
                <div class="title">{{this.title}}</div>
                <!-- 翻页部分 -->
                <div class="back-page">
                    <el-button size="medium" :v-show="currentPage!=0" @click="btnPageChange(--currentPage)" class="pageButton el-icon-arrow-left"></el-button>
                    <el-button size="mini" @click="btnPageChange(currentPage=0)" class="pageButton el-icon-d-arrow-left"></el-button>
                </div>
                <div class="forward-page">
                    <el-button size="medium" :v-show="currentPage!=totalPage" @click="btnPageChange(++currentPage)" class="pageButton nextPage el-icon-arrow-right"></el-button>
                    <el-button size="mini" @click="btnPageChange(totalPage-1)" class="pageButton lastPage el-icon-d-arrow-right"></el-button>
                </div>
                <div id="opened-book" ref="contentContainer">

                </div>
                <span class="pagenumber leftnumber">1</span>
                <span class="pagenumber rightnumber">2</span>

                <audio ref="audio" v-on:ended="playerOver" autoplay></audio>
            </div>
        </div>
        <tai-dialog :isShow="taiVisible" @close="onClose" :questionId="taiId"></tai-dialog>

        <div>
            <template v-for="(content,index) in contents">
                <!-- 普通句子 -->
                <template v-if="content.type == 1">

                </template>
                <!-- 灯泡句子 -->
                <template v-else-if="content.type == 2">

                </template>
                <!-- 图片 -->
                <template v-else-if="content.type===3"></template>
            </template>
        </div>
    </section>
</template>

<script>
import Strategy from "./strategy/strategy";
import loader from "@/utils/loader";
import TaiDialog from "./dialog/tai";
import EduDialog from "@/components/Dialog/dialog";
import popUp from "@/components/Dialog/popUp";
import { mapGetters, mapActions } from "vuex";
export default {
    components: {
        TaiDialog,
        EduDialog,
        popUp
    },
    data() {
        return {
            currentPage: 0,
            divs: [],
            sentences: [],
            currentSentenceIndex: 1,
            currentPlayMode: 0,
            currentPlayState: 0,
            sentenceIndexs: 1,
            taiVisible: false,
            taiId: "",
            contents: []
        };
    },
    methods: {
        // 加载文章内容并且解析
        loadPage(id) {
            console.log(`开始加载${id}数据`);
            loader({
                url: `/${this.dirName}/page/${id}.json`
            }).then(res => {
                // 清空内容
                let pdiv = this.$refs.contentContainer;
                while (pdiv.hasChildNodes()) {
                    pdiv.removeChild(pdiv.firstChild);
                }
                var strategy = new Strategy();
                strategy.setOrigin(this.dirName, res);
                let divs = strategy.getAllContentDiv();
                this.divs = divs;
                //追加内容
                this.divs.forEach(div => {
                    pdiv.appendChild(div);
                    div.addEventListener("click", this.divClick);
                });

                this.sentences = strategy.getAllSentenceAudios();
                this.sentenceIndexs = strategy.getAllSentenceIndex();

                this.currentSentenceIndex = this.sentenceIndexs.shift();
                // 语音正在播放的话
                if (this.currentPlayMode == 1) {
                    this.start();
                }
            })
        },
        // 单词点击
        divClick(e) {
            // 如果正在播放原文，不能听单独的单词
            if (this.currentPlayMode == 1) {
                return;
            }
            var node = e.target;
            if (node.tagName.toLowerCase() == "a") {
                // 播放单词
                this.currentPlayMode = 0;
                var audioName = node.getAttribute("_audio");
                this.$refs.audio.src = `http://${process.env.PUBLIC_PATH}/${this.dirName}/audio/${audioName}`;
            } else if (node.tagName.toLowerCase() == "i") {
                // 播放灯泡
                let taiId = node.getAttribute("_tai");
                if (taiId) {
                    console.log("需要打开灯泡弹框");
                    this.taiId = taiId;
                    this.taiVisible = true;
                }
            }
        },

        btnPageChange(page) {
            if (page < 0) {
                page = 0;
            }
            if (page >= this.totalPage) {
                page = this.totalPage - 1;
            }

            this.currentPage = page;
            console.log(this.currentPage);
            this.loadPage(this.pages[this.currentPage]);
        },
        start() {
            this.currentPlayMode = 1;
            this.currentPlayState = 1;
            var audioName = this.sentences[this.currentSentenceIndex];
            this.$refs.audio.src = `http://${process.env.PUBLIC_PATH}/${this.dirName}/audio/${audioName}`;
            this.$refs.audio.play();
        },
        stop() {
            this.$refs.audio.pause();
            this.currentPlayState = 0;
            this.currentPlayMode = 0;
        },
        playerOver() {
            this.currentPlayState = 0;
            // 如果是单词
            if (this.currentPlayMode == 0) {

            } else {
                // 如果是课文句子
                if (this.sentenceIndexs.length > 0) {
                    // 是否还有句子语音，如果有播放，没有的话翻页
                    this.currentSentenceIndex = this.sentenceIndexs.shift();
                    this.start();
                } else if (this.currentPage < this.totalPage - 1) {
                    this.btnPageChange(++this.currentPage);
                } else {
                    this.currentPlayState = 0;
                    this.currentPlayMode = 0;
                }
            }
        },

        onClose() {
            this.taiVisible = false;
        }
    },
    computed: {
        totalPage() {
            return this.pages.length;
        }, ...mapGetters({
            title: "title",
            dirName: "dirName",
            quizs: "quizs",
            tais: "tais",
            pages: "pages"
        })
    }
}
</script>

<style lang="scss" scoped>
@import "./pageContent.scss";
</style>
