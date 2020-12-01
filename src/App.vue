<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { disassemble, getCookie } from './utils/cookie'

export default {
  name: 'app',
  methods: {
    ...mapActions(['logIn']),
    ...mapMutations(['setNetwork'])
  },
  async mounted () {
    const n = getCookie('matataki_network')
    if (n) {
      this.setNetwork(n)
    }
    const c = getCookie('matataki_token')
    if (c) {
      const res = disassemble(c)
      await this.logIn(res)
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
