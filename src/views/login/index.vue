<template>
    <div class="login-container">
        <el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
            <h3 class="title">{{$t("signin.title")}}</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="form.username" auto-complete="off" :placeholder="$t('signin.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off" :placeholder="$t('signin.password')"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2('form')">{{$t("signin.login")}}</el-button>
            </el-form-item>
        </el-form>
    </div>
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
.verify-pos {
  position: absolute;
  right: 100px;
  top: 0px;
}
.card-box {
  padding: 20px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 120px auto;
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
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
}
</style>