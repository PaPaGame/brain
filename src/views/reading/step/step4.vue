<template>
    <div>
        <div>
            <span>{{$t("reading.desc4")}}</span>
        </div>
        <el-progress :text-inside="true"
            :stroke-width="18"
            :percentage="70"></el-progress>
        <el-button>{{$t('reading.takequiz')}}</el-button>
        <el-button>{{$t('reading.takequizagain')}}</el-button>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
