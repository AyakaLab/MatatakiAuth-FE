<template>
  <div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { setCookie, getCookie, clearCookie, disassemble } from '../utils/cookie'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  watch: {
    async $route (val) {
      if (val.query.token) {
        const c = getCookie('matataki_token')
        if (c) {
          clearCookie('matataki_token')
          this.logOut()
        }
        setCookie('matataki_token', val.query.token, 999)
        const res = disassemble(val.query.token)
        await this.logIn(res)
        this.$router.push({ name: 'Auth' })
      }
    }
  },
  methods: {
    ...mapActions(['logIn', 'logOut']),
    ...mapMutations(['setNetwork'])
  },
  async mounted () {
    if (this.$route.query.token) {
      const c = getCookie('matataki_token')
      if (c) {
        clearCookie('matataki_token')
        this.logOut()
      }
      this.setNetwork('main')
      setCookie('matataki_token', this.$route.query.token, 999)
      const res = disassemble(this.$route.query.token)
      await this.logIn(res)
      this.$router.push({ name: 'Auth' })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
