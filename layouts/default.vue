<template>
  <main class="default-layout">
    <TopNavbar class="top-navbar" />
    <Nuxt />
  </main>
</template>
<script>
export default {
  name: 'DefaultLayout'
}
</script>
<style scoped>
.default-layout {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  background: url('~assets/images/gray_blur.png');
}
</style>
