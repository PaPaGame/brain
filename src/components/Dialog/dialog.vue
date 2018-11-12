<template>
    <el-dialog :title="title"
        v-model="dialogVisible"
        @close="onClose"
        :visible="dialogVisible"
        :close-on-click-modal="true">
        <slot></slot>
    </el-dialog>
</template>
<script type="text/babel">
import index from './index';
export default {
  ...index
};
</script>