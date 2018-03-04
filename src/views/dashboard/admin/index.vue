<template>
    <div class="dashboard-admin-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
        <el-input ref="tiUsername"></el-input>
        <el-button type="primary"
            @click="getUserInfos">获取用户信息</el-button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            name: "admin"
        }
    },
    methods: {
        getUserInfos() {
            let username = this.$refs.tiUsername.currentValue;
            let query = {};
            query.username = username;
            console.log(query);
            this.getUserInfo(query);
        },
        ...mapActions(["getUserInfo"])
    }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 100px 60px 0px;
}
</style>

