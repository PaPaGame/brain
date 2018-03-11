<template>
    <div>
        <div>
            <span>{{$t("reading.desc2")}}</span>
        </div>
        <el-progress :text-inside="true"
            :stroke-width="18"
            :percentage="70"></el-progress>
        <el-button>{{$t('reading.readtome')}}</el-button>
        <span>{{$t('reading.glossary')}}
            <el-switch></el-switch>
        </span>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
