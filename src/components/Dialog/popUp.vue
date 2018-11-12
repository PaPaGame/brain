<template>
    <el-dialog :visible.sync="PopUpIsShow"
        :show-close="false"
        :close-on-click-modal="false"
        size="tiny">
        <slot></slot>
    </el-dialog>
</template>
<script>
export default {
  name: 'PopUp',
  props: ['PopUpIsShow']
};
</script>
<style lang="scss">
.el-dialog__body {
  padding: 20px 20px 0 20px;
}
</style>