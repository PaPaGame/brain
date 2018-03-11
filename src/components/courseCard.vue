<template>
    <section>
        <el-card :body-style="{ padding: '0px' }"
            class="boxCard">
            <div>
                <img src="@/assets/logo.png"
                    class="bgImage clearfix">
            </div>
            <el-tooltip :content="this.courseModel.title"
                placement="top"
                effect="light">
                <span class="title">
                    {{this.courseModel.title.length >= 16 ? this.courseModel.title.substring(0,18) : this.courseModel.title}}
                </span>
            </el-tooltip>
            <div style="width:160px;">
                <div class="btn-go"
                    @click="btnGoClick">Go</div>
                <div class="btn-go"
                    v-if="false"
                    @click="btnGoAgainClcik">Go&nbsp;Again</div>
            </div>
        </el-card>
    </section>
</template>

<script>
export default {
    methods: {
        btnGoClick() {
            // 开始阅读
            this.$router.push({ name: "content", params: { info: this.courseInfo } });
        },
        btnGoAgainClcik() {

        }
    },
    props: {
        courseInfo: Object
    },
    data() {
        return {
            courseModel: {
                title: "",
                cid: ""
            }
        };
    },
    watch: {
        courseInfo(val) {
            // console.log("watch::::", val);
            let c = val.course;
            let a = val.course.article[0];
            this.courseModel.title = a.fullTitle;
            this.courseModel.cid = c.cid;
        }
    }
}
</script>

<style lang="scss" scoped>
.boxCard {
  width: 160px;
  margin: 10px;
  border-radius: 10px;
  float: left;
  overflow: hidden;
  .bgImage {
    // width: 113px;
    height: 168px;
    margin: 0 auto;
    width: 100%;
  }
  .btn-go {
    height: 32px;
    line-height: 32px;
    padding: 0;
    border: 4px solid #fff;
    box-shadow: 3px 3px 10px #888;
    border-radius: 20px;
    cursor: pointer;
    margin: 0 3px 10px;
    width: 90%;
    background-color: #52cc90;
    text-align: center;
    color: #fff;
    float: left;
    &:hover {
      background-color: #3cbb86;
    }
  }

  .title {
    font-size: 14px;
    margin: 2px 3px;
    text-align: center;
    float: left;
    line-height: 20px;
    height: 20px;
    width: 100%;
  }
}
</style>
