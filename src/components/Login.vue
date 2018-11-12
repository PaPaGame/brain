<template>
  <section class="login-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="registForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
  </section>
</template>
<script>
import user from '@/service/user.js';
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入帐号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{validator: validateAccount, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   this.doLogin(this.ruleForm);
          user.login(this.ruleForm).then(console.log('login success'));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    registForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          user.addUser(this.ruleForm).then(console.log('aaa'));
        } else {
          console.log('error regist');
          return false;
        }
      });
    }
  }
};
</script>
<style>
.login-container {
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 100px;
}
</style>