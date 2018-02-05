<template>
    <div class="dashboard-student-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "student"
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-student-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 100px 60px 0px;
}
</style>

