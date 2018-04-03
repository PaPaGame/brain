<template>
    <div class="dashboard-admin-container app-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
        <info-group :infoColumns="infoColumns"></info-group>
        <el-input ref="tiUsername"></el-input>
        <el-button type="primary" @click="getUserInfos" class="iconfont icon-chart">获取用户信息</el-button>
        <el-button type="primary" @click="printUserinfo">输出用户信息</el-button>
        <course-card style="display:inline-block;"></course-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CourseCard from "@/components/courseCard";
import InfoGroup from "@/components/InfoGroup";
export default {
    components: {
        CourseCard,
        InfoGroup
    },
    data() {
        return {
            name: "admin",
            infoColumns: [{ icon: "school", title: this.$t('dashboard.schoolCount'), count: "123" },
            { icon: "mark", title: this.$t('dashboard.staffCount'), count: "777" },
            { icon: "master", title: this.$t('dashboard.studentCount'), count: "188823" },
            { icon: "group", title: this.$t('dashboard.newStudentCount'), count: "12311" }]
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
  padding: 32px;
}
</style>

