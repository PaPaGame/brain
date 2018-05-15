<template>
    <div class="login-container">

        <div class='login-box'>
            <div class="login-bg">
                <img src="../../../static/img/logo_img.png" class="logo" />
                <img src="//s3-us-west-2.amazonaws.com/static-css-assets/bg/background-school-signup.svg" class="school-svg">
            </div>
            <el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
                <!-- <h3 class="title">{{$t("signin.title")}}</h3> -->
                <span class='type'>用户名</span>
                <el-form-item prop="username">
                    <el-input type="text" v-model="form.username" auto-complete="off" :placeholder="$t('signin.username')"></el-input>
                </el-form-item>
                <span class='type'>密码</span>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" :placeholder="$t('signin.password')"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2('form')">{{$t("signin.login")}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <!-- <section class="login-form account-form">
        <div class="form-aligner">
            <div class="innerBox">
                <div class="left-box">
                    <h1>Log in to System</h1>
                    <img src="//s3-us-west-2.amazonaws.com/static-css-assets/bg/background-school-signup.svg">
                </div>
                <div class="right-box">
                    <div class="row">
                        <div class="login-field">
                            <div class="group">
                                <label>Username</label>
                                <el-input></el-input>
                            </div>
                            <div class="group">
                                <label>Password</label>
                                <el-input></el-input>
                            </div>
                        </div>
                        <div class="account-form-button-container">
                            <el-button>Log in to System</el-button>
                        </div>
                    </div>
                    <div class="footer"></div>
                </div>
            </div>
        </div>
    </section> -->
</template>

<script>
import { mapActions } from "vuex";
import router from "../../router"
export default {
    data() {
        return {
            title: '',
            form: {
                username: '',
                password: ''
            },
            rules2: {
                username: [
                    { required: true, message: this.$t("signin.inputUsername"), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t("signin.inputPassword"), trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit2(form) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let data = {}

                    data.username = this.form.username;
                    data.password = this.form.password;
                    this.doLogin(data).then(res => {
                        this.$store.dispatch("GenerateRoutes", res.role).then(() => {
                            console.log("动态路由规划完毕");
                            console.log(this.$store.getters.addRouters);
                            router.addRoutes(this.$store.getters.addRouters);
                            router.push({ path: "/" });

                        });
                    });
                } else {
                    return false
                }
            })
        },
        ...mapActions(["doLogin"])
    },
    mounted() {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.handleSubmit2('form')
            }
        })
    }
}
</script>

 <style lang="scss" scoped>
.app-container {
  position: relative;
  background: #f5f6f7;
  .login-container {
    position: absolute;
    top: 50%;
    margin-top: -250px;
    left: 50%;
    margin-left: -500px;
  }
}
.verify-pos {
  position: absolute;
  right: 100px;
  top: 0px;
}
.card-box {
  padding: 20px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 40px auto;
  width: 400px;
  border: 2px solid #8492a6;
}
.login-container {
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .loginform {
    width: 500px;
    border: none;
    margin: 0;
    padding: 112px 35px 15px 35px;
    .type {
      color: #47505e;
      font-size: 14px;
    }
    .el-form-item {
      margin-top: 10px;
      margin-bottom: 32px;
    }
    .el-form-item__error {
      padding-top: 10px;
    }
  }
}

.el-button--primary {
  background: #ff7f45;
  border: none;
  padding: 16px 62px;
  width: auto !important;
  margin: 0 auto;
  display: block;
  border-radius: 200px;
  span {
    font-weight: bold;
    font-size: 20px;
  }
  &:hover {
    background: #ff6d2c;
  }
}
.logo {
  display: block;
  margin: 80px auto 0px auto;
  width: 300px;
  height: auto;
  border-radius: 20px;
  background: #1ea69a;
}
.school-svg {
  width: 500px;
}
.login-box {
  display: -webkit-flex;
  box-shadow: 0 8px 20px #e3e7ea;
  height: 500px;
  min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  .login-bg {
    background-color: #1ea69a;
    height: 500px;
    -webkit-flex: 1;
  }
}
body {
  /*background:url('../../assets/loginbg.png');*/
}
// @import "./login.scss";
</style>