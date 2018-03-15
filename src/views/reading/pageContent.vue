<template>
    <div>
        <span>
            <h1> this is content page</h1>
        </span>
        <div style="float:left">
            <el-button size="medium">上一页</el-button>
            <el-button size="mini">首页</el-button>
        </div>
        <div style="float:right">
            <el-button size="medium">下一页</el-button>
            <el-button size="mini">末页</el-button>
        </div>

        <div>
            <label>this is title</label>
            <div class="contentContainer">content div
                <div class="paragraphs">A leo</div>
                <img class="figure"
                    src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467130448,4091191020&fm=27&gp=0.jpg"></img>
            </div>
            <div>footer</div>
        </div>
    </div>
</template>

<script>
export default {

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
