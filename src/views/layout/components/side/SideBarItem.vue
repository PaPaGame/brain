<template>
    <div class="menu-wapper">

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

    },
    watch: {
        routers: (val) => {
            console.log("aaaaaaaaaaaaa", val);
        }
    }

};
</script>

<style>

</style>
