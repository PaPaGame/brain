<template>
  <div>
    <div>
      <span class='desc'>{{$t("reading.desc4")}}</span>
    </div>
    <div class='tool-box clearfix'>
      <div class='btn-group btn-box'>
        <el-button type="primary" @click="takeQuiz()">{{$t('reading.takequiz')}}</el-button>
        <!-- <el-button type="warning">{{$t('reading.takequizagain')}}</el-button> -->
      </div>
      <edu-progress :quizCount='quizs.length' :quizprogress='quizprogress'></edu-progress>
    </div>
    <quiz-dialog :isShow="dialogVisible" @close="onClose" :questionId='quizId' @changeId='changeId'></quiz-dialog>
  </div>
</template>

<script>
import eduProgress from '@/components/progress';
import QuizDialog from '../dialog/quiz';
import {mapActions, mapGetters} from 'vuex';
import EventBus from '@/utils/eventBus';
export default {
  components: {
    QuizDialog,
    eduProgress
  },
  props: {
    isShow: {type: Boolean, default: false},
  },
  data() {
    return {
      dialogVisible: false,
      quizId:'', // this.quizs[0]
      quizprogress:0
    };
  },
  mounted(){
    EventBus.$on('quizprogress', idx=>{
      this.quizprogress = idx;
    });
  },
  methods: {
    takeQuiz(id) {
      this.dialogVisible = true;
      this.quizId = this.quizs[0];
      // console.log(this.quizs);

    },
    onClose() {
      this.dialogVisible = false;
      // this.hits = "";
      this.$emit('close');
    },
    changeId(idx) {
      this.quizId = idx.toString();
    },
    ...mapActions(['getQuizInfo'])
  },
  computed: {
    ...mapGetters({
      dirName: 'dirName',
      quizs: 'quizs',
      quiz: 'quiz'
    })
  },
  watch: {
    isShow() {
      this.dialogVisible = this.isShow;
    }
  }
};
</script>

<style lang="scss">
@import './step.scss';
</style>
