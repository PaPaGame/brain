<template>
    <div class="dashboard-container">
        <component :is="currentRole"></component>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "@/views/dashboard/admin";
import editorDashboard from "@/views/dashboard/editor";
import * as Role from "@/router/roleType";
import SvgIcon from "@/components/SvgIcon";
import Vue from "vue";

Vue.component('svg-icon', SvgIcon);
export default {
    name: 'dashboard',
    components: {
        adminDashboard,
        editorDashboard
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
        if (!this.roles.includes('admin')) {
            this.currentRole = "adminDashboard";
        }
        switch (this.userinfo.role) {
            case Role.STUDENT:
                break;
            case Role.STAFF: break;
            case Role.MASTER: break;
            case Role.ADMIN: break;
        }
    }

}
</script>

<style>

</style>
