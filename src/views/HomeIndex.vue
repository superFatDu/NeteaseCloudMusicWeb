<template>
  <div class="index">
    <div class="top-title">
      <i class="iconfont top-title-menu">&#xe60b;</i>
      <div class="top-title-nav">
        <i class="iconfont" :class="{active: 1 === topNavActive}" @touchend="topNavActive = 1">&#xe6e1;</i>
        <i class="iconfont" :class="{active: 2 === topNavActive}" @touchend="topNavActive = 2">&#xe63e;</i>
      </div>
      <i class="iconfont top-title-search">&#xe607;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  data() {
    return {
      topNavActive: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  position: relative;
  .top-title {
    line-height: 0.6rem;
    height: 0.6rem;
    background: #d43c33;
    i {
      color: #fff;
      font-size: 0.26rem;
    }
    .top-title-menu {
      display: inline-block;
      height: 100%;
      padding: 0 0.15rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .top-title-search {
      display: inline-block;
      height: 100%;
      padding: 0 0.15rem;
      position: absolute;
      top: 0;
      right: 0;
    }
    .top-title-nav {
      width: 100%;
      text-align: center;
      i {
        color: rgba(255, 255, 255, 0.4);
        display: inline-block;
        height: 100%;
        padding: 0 0.15rem;
      }
      .active {
        color: #fff;
      }
    }
  }
}
</style>