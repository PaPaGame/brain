<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div class="scroll-wapper" ref="scrollWrapper" :style="{top:top+'px'}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";
.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wapper {
    position: absolute;
    width: 100% !important;
  }
}
</style>
