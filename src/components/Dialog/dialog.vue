<template>
    <el-dialog :title="title"
        v-model="dialogVisible"
        :visible="dialogVisible"
        @close="onClose"
        :close-on-click-modal="true"
        :size="size">
        <slot></slot>
    </el-dialog>
</template>
<script type="text/babel">
import index from './index'
export default {
    ...index
}
</script>