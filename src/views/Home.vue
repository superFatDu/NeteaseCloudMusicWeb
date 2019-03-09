<template>
  <div class="home">
    <keep-alive include="HomeIndex">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>