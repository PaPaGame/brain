<template>
    <div class="dashboard-admin-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
        <el-input ref="tiUsername"></el-input>
        <el-button type="primary"
            @click="getUserInfos">获取用户信息</el-button>
        <el-button type="primary"
            @click="printUserinfo">输出用户信息</el-button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
            this.getUserInfo(query);
        },
        printUserinfo() {
            // console.log(this.comParams);
            // console.log(this.userinfo, userinfo);
            console.log(this.$store.getters.userinfo);
        },
        ...mapActions(["getUserInfo"])
    },
    computed: {
        comParams() {
            return this.userinfo;
        }
    },
    ...mapGetters({
        userinfo: "userinfo"
    })
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 100px 60px 0px;
}
</style>

