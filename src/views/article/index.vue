<template>
    <span>文章管理</span>
</template>

<script>
import table from "@/components/table";
import { mapActions } from 'vuex';
export default {
    components: {
        "edu-table": table
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions([])
    }

}
</script>

<style>

</style>
