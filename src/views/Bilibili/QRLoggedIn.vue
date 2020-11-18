<template>
  <Layout>
    <div class="main-title">验证成功！</div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Layout
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  watch: {
    isLoggedIn (val) {
      if (!val) this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    if (!this.isLoggedIn) this.$router.push({ name: 'Home' })
    else {
      setTimeout(() => {
        this.$router.push({ name: 'Auth' })
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
.main-title {
  margin: 100px auto 40px;
  font-size: 24px;
}
</style>
