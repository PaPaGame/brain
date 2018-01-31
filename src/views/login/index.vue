<template>
    <div class="login-container">
        <el-form>
            <div class="title-container">
                <h3 class="title">{{$t('login.title')}}</h3>
            </div>
            <el-form-item>
                <el-input type="text" placeholder="username" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="password" @keyup.enter.native="login"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  methods: {
    login: () => {
      console.log("哈哈哈");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
