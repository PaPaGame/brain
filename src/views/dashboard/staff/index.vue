<template>
    <div class="dashboard-staff-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
        <info-group :infoColumns="infoColumns" :info="info"></info-group>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import InfoGroup from "@/components/InfoGroup";
import userServices from "@/api/user";
export default {
    components: {
        InfoGroup
    },
    created() {
        userServices.dashboard(this.userinfo).then(res => {
            if (res.status === 200) {
                this.info = res.info;
            } else {
                this.$message.error(this.$t("dashboard.fetchError"));
            }
        })
    },
    data() {
        return {
            name: "staff",
            info: [0, 0, 0],
            infoColumns: [
                { icon: "school", title: this.$t('dashboard.haveGroupCount'), count: "0" },
                { icon: "mark", title: this.$t('dashboard.studentCount'), count: "0" },
                { icon: "master", title: this.$t('dashboard.needMarkCount'), count: "0" }
            ]
        }
    },
    computed: {
        ...mapGetters([
            "userinfo"
        ])
    },
}
</script>

<style lang="scss" scoped>
.dashboard-staff-container {
  background-color: #e3e3e3;
  top: 0px;
  bottom: 0px;
  padding: 100px 60px 0px;
}
</style>

