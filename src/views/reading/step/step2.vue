<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc2")}}</span>
        </div>
        <el-progress :text-inside="true" :stroke-width="28" :percentage="70"></el-progress>
        <div class='btn-group'>
            <el-button type="primary"  @click="start">{{$t('reading.readtome')}}</el-button>
            <el-button type="warning" @click="pause">{{$t('reading.pause')}}</el-button>
            <span class='switch'>
                <el-switch v-model="switchVal"></el-switch> {{$t('reading.glossary')}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            switchVal:false
        }
    },
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
