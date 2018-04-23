<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc2")}}</span>
        </div>
        <el-progress :text-inside="true" :stroke-width="28" :percentage="70"></el-progress>
        <div class='btn-group'>
            <el-button @click="start">{{$t('reading.readtome')}}</el-button>
            <el-button @click="pause">{{$t('reading.pause')}}</el-button>
            <span class='switch'>{{$t('reading.glossary')}}
                <el-switch></el-switch>
            </span>
        </div>
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

<style lang="scss">
@import "./step.scss";
</style>
