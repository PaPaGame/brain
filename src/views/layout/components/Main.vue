<template>
    <section class="app-main">
        <transition name="fade"
            mode="out-in">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
    </section>
</template>

<script>
export default { name: "AppMain" };
</script>

<style>
	.app-main {
		height: calc(100% - 50px);
	    overflow-y: scroll;
        padding: 0 50px;
	}
	#app .main-container {
	    height: 100%;
	}
</style>
