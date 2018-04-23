<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc4")}}</span>
        </div>
        <el-progress :text-inside="true"
            :stroke-width="28"
            :percentage="70"></el-progress>
        <div class='btn-group'>
        <el-button>{{$t('reading.takequiz')}}</el-button>
        <el-button>{{$t('reading.takequizagain')}}</el-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "./step.scss";
</style>
