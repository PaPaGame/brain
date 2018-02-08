<template>
    <div class="menu-wapper">
        <template v-for="item in routers">
            <router-link>
                <el-menu-item>
                </el-menu-item>
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SideBarItem',
    props: {
        routers: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    }

};
</script>

<style>

</style>
