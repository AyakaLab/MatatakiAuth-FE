<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { disassemble, getCookie } from './utils/cookie'

export default {
  name: 'app',
  methods: {
    ...mapActions(['logIn'])
  },
  async mounted () {
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
