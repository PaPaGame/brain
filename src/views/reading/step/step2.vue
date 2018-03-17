<template>
    <div>
        <div>
            <span>{{$t("reading.desc2")}}</span>
        </div>
        <el-progress :text-inside="true"
            :stroke-width="18"
            :percentage="70"></el-progress>
        <el-button @click="start">{{$t('reading.readtome')}}</el-button>
        <el-button @click="pause">{{$t('reading.pause')}}</el-button>
        <span>{{$t('reading.glossary')}}
            <el-switch></el-switch>
        </span>
    </div>
</template>

<script>
export default {
    methods: {
        start() {
            this.$emit("startReading");
        },
        pause() {
            this.$emit("stopReading");
        }
    }
}
</script>

<style>

</style>
