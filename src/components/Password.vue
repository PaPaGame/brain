<template>
    <section>
        <div class="clearfix">
            <div class="clearfix label-box">
                <span>密码</span>
                <input class="copy-text fl" type="password" ref="originPwd"></input>
                <i class="el-icon-view" @mouseover="this.onMouseOver1()"></i>
            </div>
            <div class="clearfix label-box">
                <span>再次输入</span>
                <input class="copy-text fl" type="password"></input>
            </div>
            <!-- <el-button @click="updatePasswordHandler">确认</el-button> -->
        </div>
    </section>
</template>

<script>
export default {
    props: {
        userInfo: Object
    },
    methods: {
        updatePasswordHandler() {

        },

        onMouseOver1(e) {
            console.log("over!!");
            // this.$refs[originPwd].type = "text";
        }
    }
}
</script>

<style lang="scss" scoped>
$color: #444;
.label-box {
  margin-bottom: 15px;
  span {
    float: left;
    font-size: 12px;
    color: $color;
    text-align: right;
    margin-right: 10px;
    margin-top: 6px;
    width: 100px;
  }
  .copy-text {
    width: 300px;
    height: 30px;
    border-radius: 4px;
    background-color: #f2f4f6;
    border: solid 1px #c4c4c4;
    padding-left: 6px;
    line-height: 30px;
    color: $color;
    font-size: 12px;
    margin-right: 10px;
    &.address {
      background-color: #f2f4f6;
    }
  }
}
</style>

