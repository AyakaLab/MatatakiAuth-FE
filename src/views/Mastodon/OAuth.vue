<template>
  <Layout>
    <div class="oauth-container">
      <img :src="mastodonIcon" class="oauth-container-icon" />
      <div v-if="step1">
        <div class="oauth-container-step">
          第一步 Step 1
        </div>
        <div class="oauth-container-title">
          请先填写你的用户名以开始验证<br>
          <span class="oauth-container-title-strong">用户名必须包含你注册的实例的域名</span>
        </div>
        <el-input class="oauth-container-input" v-model="username" placeholder="@username@example.com" @keyup.enter.native="submit(username)"></el-input>
      </div>
      <div v-if="step2">
        <div class="oauth-container-step">
          第二步 Step 2
        </div>
        <div class="oauth-container-title">
          <br>
          <span class="oauth-container-title-strong"></span>
        </div>
        <el-input class="oauth-container-input" v-model="username" placeholder="@username@example.com" @keyup.enter.native="submit(username)"></el-input>
      </div>
      <el-button type="primary" @click="submit(username)">{{ buttonText }}</el-button>
    </div>
  </Layout>
</template>

<script>

/**
 * 步骤 1
 * 填写用户名和域名
 * 验证域名是否是一个合法的域名
 * 验证域名是否是一个合法的 mastodon 实例
 * 步骤 2
 * 获取用户的用户 id
 * 根据对应的时间戳和 id 生成指定的识别码
 * 步骤 3
 * 生成 40 字节的识别码
 * 要求用户在 mastodon 发布填写有识别码的嘟文
 * 获取用户嘟文状态，读取识别码
 * 如果匹配，存储 username 以及 id
 * 提示用户绑定成功
 */

import Layout from '@/components/Layout.vue'
import mastodonIcon from '@/assets/mastodon.png'

import API from '@/api/api'
import { mapState } from 'vuex'

export default {
  components: {
    Layout
  },
  data () {
    return {
      mastodonIcon: mastodonIcon,
      username: '',
      buttonText: '确认',
      step1: true,
      step2: false
    }
  },
  computed: {
    ...mapState(['userId', 'isLoggedIn', 'network'])
  },
  methods: {
    submit (text) {
      let result = ''
      if (text.startsWith('@')) {
        result = text.replace(/^@/, '')
        this.usernameInputValidator(result)
      } else {
        this.usernameInputValidator(text)
      }
    },
    usernameInputValidator (inputText) {
      let resultArr = []
      resultArr = inputText.split('@')
      if (!resultArr[1]) {
        this.$message.error('输入的用户名没有包含实例地址')
      } else if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(resultArr[1])) {
        this.$message.error('输入的实例地址无效')
      } else {
        console.log(inputText)
        this.mastodonInstanceValidator(resultArr[1])
      }
    },
    async mastodonInstanceValidator (domain) {
      await API.Mastodon.isMastodonInstance(domain)
    }
  },
  watch: {
    isLoggedIn (val) {
      if (!val) this.$router.push({ name: 'Home' })
    }
  },
  async mounted () {
    if (!this.isLoggedIn) this.$router.push({ name: 'Home' })
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="less" scoped>
.oauth-container {
  height: 330px;
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
  &-step {
    margin: 10px auto 10px;
    font-size: 20px;
  }
  &-title {
    padding-top: 5px;
    &-strong {
      font-size: 14px;
      color: red;
    }
  }
  &-input {
    width: 300px;
    margin: 20px auto 20px;
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
