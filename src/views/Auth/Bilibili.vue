<template>
  <Layout>
    <div class="main-title">选择验证方式</div>
    <div class="platformcard-container">
      <AuthMethodCard v-for="(item, index) of availableList" :key="index" :item="item" />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import AuthMethodCard from '@/components/AuthMethodCard.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import { setCookie, getCookie, clearCookie, disassemble } from '../../utils/cookie'

export default {
  components: {
    Layout,
    AuthMethodCard
  },
  data () {
    return {
      availableList: [
        {
          method: 'qrcode',
          methodName: '扫码登录',
          path: 'BilibiliQRAuth',
          color: '#59C2DF'
        }
      ]
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  watch: {
    isLoggedIn (val) {
      if (!val) this.$router.push({ name: 'Home' })
    },
    async $route (val) {
      if (val.query.token) {
        this.cookieControl(val.query)
      }
    }
  },
  methods: {
    ...mapActions(['logIn', 'logOut']),
    ...mapMutations(['setNetwork']),
    async cookieControl (query) {
      const n = getCookie('matataki_network')
      if (n) {
        clearCookie('matataki_network')
        this.logOut()
      }
      setCookie('matataki_network', query.network)
      const c = getCookie('matataki_token')
      if (c) {
        clearCookie('matataki_token')
        this.logOut()
      }
      setCookie('matataki_token', query.token)
      const res = disassemble(query.token)
      await this.logIn(res)
      this.setNetwork(query.network)
    }
  },
  async mounted () {
    if (this.$route.query.token) {
      this.cookieControl(this.$route.query)
    } else if (!this.isLoggedIn) this.$router.push({ name: 'Home' })
  }
}
</script>

<style lang="less" scoped>
.main-title {
  margin: 100px auto 40px;
  font-size: 24px;
}

.platformcard-container {
  margin: 20px 200px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
  grid-gap: 48px 60px;
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 992px) {
  .platformcard-container {
    margin: 20px 200px 20px;
  }
}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 640px) {
  .platformcard-container {
    margin: 20px 150px 20px;
  }
}

@media screen and (max-width: 480px) {
  .platformcard-container {
    margin: 20px 20px 20px;
  }
}
</style>
