<template>
  <Layout>
    <div class="scan-container">
      <img :src="bilibiliIcon" class="scan-container-icon" />
      <div class="scan-container-title">
        使用 Bilibili 手机客户端<br>
        扫描二维码来授权登录
      </div>
      <div>
        <div v-if="scanned" class="qrcode-mask">
          扫描成功，<br>
          请在手机上确认
        </div>
        <div v-if="timedout" class="qrcode-mask">
          二维码已过期，<br>
          请点击刷新或刷新页面
        </div>
        <qrcode v-if="link" :value="link" :options="{ width: 200 }"></qrcode>
        <div v-else v-loading="true" class="qrcode-loading">
      </div>
      </div>
      <el-button type="primary" @click="refreshInterval" class="refresh-btn">刷新</el-button>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import bilibiliIcon from '@/assets/bilibili.svg'

import API from '@/api/api'

export default {
  components: {
    Layout
  },
  data () {
    return {
      link: '',
      hashId: '',
      scanned: false,
      loggedIn: true,
      timedout: false,
      bilibiliIcon: bilibiliIcon,
      intervalId: null
    }
  },
  methods: {
    async getQrcodeLink () {
      const res = await API.Bilibili.getQrcode()
      this.link = res.url
      this.hashId = res.hashId
      this.intervalId = setInterval(async () => {
        const res = await API.Bilibili.getLoginStatus(this.hashId)
        if (res.message === 'Can\'t confirm~') {
          this.scanned = true
        }
        if (res.code === 0) {
          this.loggedIn = true
          this.$router.push({ name: 'AuthBilibiliSuccess' })
        }
        if (res.code === -10) {
          this.timedout = true
          // this.refreshInterval()
        }
      }, 1000)
    },
    async refreshInterval () {
      const res = await API.Bilibili.getQrcode()
      this.link = res.url
      this.hashId = res.hashId
      this.loggedIn = false
      this.timedout = false
      clearInterval(this.intervalId)
      this.intervalId = setInterval(async () => {
        const res = await API.Bilibili.getLoginStatus(this.hashId)
        if (res.message === 'Can\'t confirm~') {
          this.scanned = true
        }
        if (res.code === -10 && !this.loggedIn) {
          this.timedout = true
          // this.refreshInterval()
        }
        if (res.code === 0) {
          this.loggedIn = true
          this.$router.push({ name: 'AuthBilibiliSuccess' })
          clearInterval(this.intervalId)
        }
      }, 1000)
    }
  },
  async mounted () {
    await this.getQrcodeLink()
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="less" scoped>
.scan-container {
  height: 400px;
  width: 350px;
  -webkit-box-shadow: 0 10px 40px 0 rgba(0,0,0,.1);
  box-shadow: 0 10px 40px 0 rgba(0,0,0,.1);
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-icon {
    padding-top: 30px;
    height: 50px;
    object-fit: cover;
  }
  &-title {
    padding-top: 5px;
  }
}

.qrcode-mask {
  height: 200px;
  width: 200px;
  background: rgba(0,0,0,.6);
  position: absolute;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-loading {
  height: 200px;
  width: 350px;
}

.refresh-btn {
  margin-bottom: 20px;
}
</style>
