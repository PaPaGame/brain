<template>
    <div class="dashboard-editor-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "editor"
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  padding: 100px 60px 0px;
  top: 0px;
  bottom: 0px;
}
</style>

