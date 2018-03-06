<template>
    <div class="app-wrapper clearfix">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar class="nav-container"></nav-bar>
            <app-main class="content-container"></app-main>
        </div>
    </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from './components'
export default {
    name: 'layout',
    components: {
        NavBar,
        SideBar,
        AppMain
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app_wrapper {
  position: relative;
  width: 100%;
}
.content-container {
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
