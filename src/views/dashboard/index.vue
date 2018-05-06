<template>
    <div class="dashboard-container">
        <component :is="currentRole"></component>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "@/views/dashboard/admin";
import masterDashboard from "@/views/dashboard/master";
import staffDashboard from "@/views/dashboard/staff";
import studentDashboard from "@/views/dashboard/student";
import * as Role from "@/router/roleType";
import SvgIcon from "@/components/SvgIcon";
import Vue from "vue";

Vue.component('svg-icon', SvgIcon);
export default {
    name: 'dashboard',
    components: {
        adminDashboard,
        masterDashboard,
        staffDashboard,
        studentDashboard
    },
    data() {
        return {
            currentRole: 'adminDashboard'
        }
    },
    computed: {
        ...mapGetters([
            'userinfo'
        ])
    },
    created() {
        switch (this.userinfo.role) {
            case Role.STUDENT:
                this.currentRole = "studentDashboard";
                break;
            case Role.STAFF:
                this.currentRole = "staffDashboard";
                break;
            case Role.MASTER: this.currentRole = "masterDashboard";
                break;
            case Role.ADMIN: this.currentRole = "adminDashboard";
                break;
            default:
                break;
        }
    }

}
</script>

<style>

</style>
