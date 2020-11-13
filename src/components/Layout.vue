<template>
  <div class="container">
    <Header />
    <div class="slot-shell" id="slot-shell">
      <slot />
    </div>
    <Footer class="footer-container" />
  </div>
</template>

<script>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.slot-shell {
  flex: 1;
}

.footer-container {
  height: 56px;
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>
