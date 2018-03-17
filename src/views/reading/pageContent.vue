<template>
    <div>
        <span>
            <h1> this is content page</h1>
        </span>
        <div style="float:left">
            <el-button size="medium"
                :v-show="this.currentPage!=0">上一页</el-button>
            <el-button size="mini">首页</el-button>
        </div>
        <div style="float:right">
            <el-button size="medium"
                :v-show="this.currentPage!=totalPage">下一页</el-button>
            <el-button size="mini">末页</el-button>
        </div>

        <div>
            <label>{{this.title}}</label>
            <div class="contentContainer"
                ref="contentContainer">content div
                <div class="paragraphs">{{this.pages}}</div>
                <div class="paragraphs">{{this.tais}}</div>
                <div class="paragraphs">{{this.quizs}}</div>
                <img class="figure"
                    src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467130448,4091191020&fm=27&gp=0.jpg"></img>
                <!-- <template v-for="div in divs">{{div.innerHTML}}</template> -->
            </div>
            <div>footer</div>
        </div>
    </div>
</template>

<script>
import Strategy from "./strategy/strategy";
import loader from "@/utils/loader";
export default {
    data() {
        return {
            currentPage: 0,
            totalPage: 10,
            divs: []
        };
    },
    props: {
        title: { type: String, default: () => "" },
        pages: { type: Array, default: () => [] },
        tais: { type: Array, default: () => [] },
        quizs: { type: Array, default: () => [] },
        dirName: { type: String, default: () => "" }
    },
    methods: {
        loadPage(id) {
            console.log(`开始加载${id}数据`);
            loader({
                url: `/${this.dirName}/page/${id}.json`
            }).then(res => {
                // console.log(typeof res);
                // console.log(res["regions"][0]);
                var strategy = new Strategy();
                strategy.setOrigin(res);
                let divs = strategy.getAllContentDiv();
                this.divs = divs;

                this.divs.forEach(div => {
                    this.$refs.contentContainer.appendChild(div);
                })
            })
        }
    },
    watch: {
        pages(val) {
            let data = val;
            if (data.length == 0)
                throw new Error("课文数据为空");
            //  赋值的话， 只有可能是外部点击文章列表， 所以显示第一页内容即可
            this.loadPage(data[0]);
            this.currentPage = 0;
            this.totalPage = data.length;
        },
        tais(val) {

        },
        quizs(val) {

        }
    }
}
</script>

<style lang="scss" scoped>
.contentContainer {
  background-color: #f00;
  position: relative;
  .paragraphs {
    width: 200px;
    height: 200px;
    position: absolute;
    font-size: 18px;
    color: lightblue;
    top: 100px;
    left: 300px;
  }

  .figure {
    top: 400px;
    right: 100px;
    width: 100px;
    height: 160px;
    position: absolute;
  }
}
</style>
