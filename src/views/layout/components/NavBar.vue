<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <!-- <img class="user-avatar el-icon-menu">  -->
                    <span class="user-avatar el-icon-menu">{{this.currentRole}}</span>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            {{$t('navbar.dashboard')}}
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            <span @click="logout" style="display:block;">{{$t('navbar.logout')}}</span>
                        </el-dropdown-item>
                    </router-link>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as RoleType from "@/router/roleType";
export default {
    methods: {
        logout() {
            console.log("logout from navbar");
            this.doLogout();
        },
        ...mapActions(["doLogout"])
    },
    computed: {
        currentRole() {
            switch (this.userinfo.role) {
                case RoleType.STUDENT:
                    return "Student";
                case RoleType.MASTER:
                    return "Master";
                case RoleType.ADMIN:
                    return "Admin";
                case RoleType.STAFF:
                    return "Staff"
                default:
                    return "NO";
            }
        },
        ...mapGetters({
            userinfo: "userinfo"
        })
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .right-menu {
    float: right;
    height: 100%;
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 40px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
