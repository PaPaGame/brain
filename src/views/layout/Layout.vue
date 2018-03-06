<template>
    <div class="app-wrapper clearfix">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar></nav-bar>
            <app-main></app-main>
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
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
