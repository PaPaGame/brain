<template>
  <section class="story">
    <div class="story-panel">
      <!-- 文章具体内容 -->
      <div class="pageContent">
        <div class="title">{{this.title}}</div>

        <div id="opened-book" ref="contentContainer">
          <img id="imgCover" class="imgCover">
        </div>
        <!-- 翻页部分 -->
        <div class="page-btn back-page">
          <el-button size="medium" :v-show="currentPage!=0" @click="btnPageChange(--currentPage)" class="pageButton el-icon-arrow-left btn-next"></el-button>
          <el-button size="mini" @click="btnPageChange(currentPage=0)" class="pageButton el-icon-d-arrow-left"></el-button>
        </div>
        <div class="page-btn forward-page">
          <el-button size="medium" :v-show="currentPage!=totalPage" @click="btnPageChange(++currentPage)" class="pageButton nextPage el-icon-arrow-right btn-next"></el-button>
          <el-button size="mini" @click="btnPageChange(totalPage-1)" class="pageButton lastPage el-icon-d-arrow-right"></el-button>
        </div>
        <span class="pagenumber leftnumber">{{leftnumber}}</span>
        <span class="pagenumber rightnumber">{{rightnumber}}</span>

        <audio ref="audio" v-on:ended="playerOver" autoplay></audio>
      </div>
    </div>
    <tai-dialog :isShow="taiVisible" @close="onClose" :questionId="taiId"></tai-dialog>
    <explain-dialog :isShow="explainVisible" @close="onExplainClose" :word="explainWord"></explain-dialog>
    <div>
      <template v-for="content in contents">
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
import Strategy from './strategy/strategy';
import loader from '@/utils/loader';
import TaiDialog from './dialog/tai';
import ExplainDialog from './dialog/explain';
import EduDialog from '@/components/Dialog/dialog';
import popUp from '@/components/Dialog/popUp';
import {mapGetters} from 'vuex';
export default {
  components: {
    TaiDialog,
    EduDialog,
    ExplainDialog,
    popUp
  },
  data() {
    return {
      currentPage: -1,
      divs: [],
      sentences: [],
      currentSentenceIndex: 1,
      currentPlayMode: 0,
      currentPlayState: 0,
      sentenceIndexs: 1,
      taiVisible: false,
      taiId: '',
      contents: [],
      wordNode: [],
      explainVisible: false,
      explainWord: {},
      leftnumber: 1,
      rightnumber: 2,
      lastIndex: -1
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
        // 追加内容
        this.divs.forEach(div => {
          pdiv.appendChild(div);
          div.addEventListener('click', this.divClick);
        });

        this.sentences = strategy.getAllSentenceAudios();
        this.sentenceIndexs = strategy.getAllSentenceIndex();

        this.currentSentenceIndex = this.sentenceIndexs.shift();
        // 语音正在播放的话
        if (this.currentPlayMode === 1) {
          this.start();
        }


      });
    },
    // 单词点击
    divClick(e) {

      // 如果正在播放原文，不能听单独的单词
      if (this.currentPlayMode === 1) {
        return;
      }
      var node = e.target;
      if (node.tagName.toLowerCase() === 'a') {

        let spell = node.innerHTML;
        // 点击的单词，如果在vuex里有并且接受开关已开启， 并且是打开解释的时候 就弹框，否则就播放声音
        if (this.glossaries[spell]) {
          console.log('单词表里有这个单词');
          this.explainWord = this.glossaries[spell];
          this.explainVisible = true;

        } else {
          // 播放单词
          this.currentPlayMode = 0;
          var audioName = node.getAttribute('_audio');
          this.$refs.audio.src = `${process.env.PUBLIC_PATH}/${this.dirName}/audio/${audioName}`;

          this.wordNode = document.getElementById('opened-book').getElementsByTagName('a');
          for (var i = 0; i < this.wordNode.length; i += 1) {
            // this.wordNode[i].setAttribute('class','');
            this.wordNode[i].style.background = 'inherit';
            this.wordNode[i].style.color = 'inherit';
          }
          // node.setAttribute('class', 'active');
          node.style.background = '#409eff';
          node.style.color = '#fff';
        }
      } else if (node.tagName.toLowerCase() === 'i') {
        // 播放灯泡
        let taiId = node.getAttribute('_tai');
        if (taiId) {
          console.log('需要打开灯泡弹框');
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
      console.log(this.currentPage + '当前页码');
      this.leftnumber = this.currentPage * 2 + 1;
      this.rightnumber = this.currentPage * 2 + 2;
      this.loadPage(this.pages[this.currentPage]);
    },
    start() {
      console.log('开始播放了');
      this.currentPlayMode = 1;
      this.currentPlayState = 1;
      var audioName = this.sentences[this.currentSentenceIndex];
      this.$refs.audio.src = `${process.env.PUBLIC_PATH}/${this.dirName}/audio/${audioName}`;
      this.$refs.audio.play();

      // colour 着色，为当前播放句子添加背景颜色
      this.colourSentences(this.currentSentenceIndex);
    },
    stop() {
      this.$refs.audio.pause();
      this.currentPlayState = 0;
      this.currentPlayMode = 0;
    },
    playerOver() {
      this.currentPlayState = 0;
      // 如果是单词
      if (this.currentPlayMode === 0) {

      } else {
        // 如果是课文句子
        if (this.sentenceIndexs.length > 0) {
          // 是否还有句子语音，如果有播放，没有的话翻页
          this.currentSentenceIndex = this.sentenceIndexs.shift();
          this.start();
        } else if (this.currentPage < this.totalPage - 1) {
          this.currentPage += 1;
          this.btnPageChange(this.currentPage);
        } else {
          this.currentPlayState = 0;
          this.currentPlayMode = 0;
        }
      }
    },

    onClose() {
      this.taiVisible = false;
    },

    onExplainClose() {
      this.explainVisible = false;
    },

    colourSentences(index) {
      if (this.lastIndex === -1) {
        this.lastIndex = index;
      }

      console.log(`播放编号为：${index} 的句子`);
      let lastDiv = document.getElementById('sen' + this.lastIndex);
      this.removeColour(lastDiv);
      this.lastIndex = index;
      // 着色当前索引的句子
      let div = document.getElementById('sen' + index);
      this.addColour(div);

    },

    removeColour(div) {
      if (!div) {
        return;
      }
      div.style.backgroundColor = 'transparent';
    },

    addColour(div) {
      div.style.backgroundColor = '#f56c6c';
    }
  },
  computed: {
    totalPage() {
      return this.pages.length;
    }, ...mapGetters({
      title: 'title',
      dirName: 'dirName',
      quizs: 'quizs',
      tais: 'tais',
      pages: 'pages',
      glossaries: 'glossaries',
      courseInfo: 'courseInfo'
    })
  },
  mounted() {
    let img = document.getElementById('imgCover');
    console.log('mounted', this.courseInfo);
    if (!this.courseInfo) {
      console.log('课程信息为空， 无法初始化');
      return;
    }
    img.src = `${process.env.PUBLIC_PATH}/${this.courseInfo.dirName}/images/${this.courseInfo.cover}`;
  }
};
</script>

<style lang="scss" scoped>
@import './pageContent.scss';
</style>
