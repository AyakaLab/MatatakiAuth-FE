<template>
  <Layout>
    <div class="oauth-container">
      <img :src="mastodonIcon" class="oauth-container-icon" />
      <div class="oauth-container-steps">
        <div class="oauth-container-steps-title">
          使用你的账号在 Mastodon 发布以下内容<br>
          <div class="oauth-container-steps-oauth">
            <span class="oauth-container-steps-oauth-strong">{{ randomStr }}</span>
            <span class="icon"><i class="el-icon-s-order" @click="copyToClipboard(randomStr)" type="primary" ></i></span><br>
          </div>
          <span>然后粘贴你的嘟文链接到输入框</span><br>
        </div>
        <el-input class="oauth-container-steps-input" v-model="tootLink" placeholder="https://example.com/@username/0000000000000000" @keyup.enter.native="submit(tootLink)"></el-input>
      </div>
      <el-button class="verify-btn" type="primary" @click="submit(tootLink)" :loading="btnLoading">{{ buttonText }}</el-button>
    </div>
  </Layout>
</template>

<script>
import crypto from 'crypto'
import { mapState } from 'vuex'

import Layout from '@/components/Layout.vue'
import mastodonIcon from '@/assets/mastodon.png'

import API from '@/api/api'
import { getCookie } from '../../utils/cookie'
import { Limiter } from '../../utils/limiter'

export default {
  components: {
    Layout
  },
  data () {
    return {
      mastodonIcon: mastodonIcon,
      username: '',
      domain: '',
      protocol: '',
      tootLink: '',
      randomStr: '',
      buttonText: '确认',
      oauthToken: '',
      btnLoading: false
    }
  },
  computed: {
    ...mapState(['userId', 'isLoggedIn', 'network'])
  },
  methods: {
    submit (text) {
      this.btnLoading = true
      this.tootInputValidator(text)
    },
    async tootInputValidator (inputText) {
      if (!inputText) {
        this.$message.error('链接不能为空')
        this.btnLoading = false
        return
      }

      if (!/^https?:\/\//.test(inputText)) {
        this.$message.error('请复制完整的包含 https/http 的链接')
        this.btnLoading = false
        return
      }

      if (!/^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/(@([a-zA-Z0-9])*)\/\d+$/.test(inputText)) {
        this.$message.error('输入的嘟文地址无效')
        this.btnLoading = false
        return
      }

      this.btnLoading = true

      const domain = inputText.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)
      const protocol = inputText.match(/^https?:\/\//)
      const statusId = inputText.replace(/https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/(@([a-zA-Z0-9])*)\//, '')

      await this.getToken()
      console.log()
      if (!domain) {
        this.$message.error('输入的实例地址无效')
      } else {
        this.tootLink = inputText
        this.domain = domain[0]
        if (protocol[0]) this.protocol = protocol[0]
        else this.protocol = 'http://'

        const limit = Limiter.check('tootcheck')
        if (limit.code === 1) {
          this.$message.warning(`重复操作次数过多，请等待 ${Math.ceil(limit.time / 10 ** 3)} 秒再试`)
          this.btnLoading = false
          return
        }

        const isMastodon = await this.mastodonInstanceValidator(protocol[0] + this.domain)
        if (isMastodon) {
          const result = await API.Mastodon.getStatus(this.protocol + this.domain, statusId, this.randomStr)
          if (result) {
            let updateRes
            if (this.network === 'test') {
              updateRes = await API.Mastodon.getUpdateTest(this.oauthToken, this.userId, result.account.id, result.account.username, protocol[0] + this.domain)
            } else {
              updateRes = await API.Mastodon.getUpdate(this.oauthToken, this.userId, result.account.id, result.account.username, protocol[0] + this.domain)
            }

            if (updateRes.code === 0) {
              this.$message.success('成功')
              this.$router.push({ name: 'AuthMastodonSuccess' })
            }
          } else {
            this.$message.error('嘟文文本没有包含指定的字符串，请重新尝试')
          }
          this.btnLoading = false
          return
        } else {
          this.$message.error('输入的实例地址不是一个 Mastodon 实例')
        }
      }
      this.btnLoading = false
    },
    async mastodonInstanceValidator (url) {
      return (await API.Mastodon.isMastodonInstance(url))
    },
    async tootValidator (statusId) {
    },
    getRandomString () {
      return crypto.randomBytes(10).toString('hex')
    },
    async getToken () {
      const c = getCookie('matataki_token')
      let res = {}
      if (this.network === 'test') {
        res = await API.Mastodon.getOAuthTokenTest(c)
      } else {
        res = await API.Mastodon.getOAuthToken(c)
      }
      this.oauthToken = res.token
    },
    copyToClipboard (text) {
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text)
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          this.$notify.success({
            title: '复制成功',
            message: '内容已经成功复制到剪贴板'
          })
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          this.$notify.error({
            title: '复制失败',
            message: '请手动复制内容'
          })
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    }
  },
  watch: {
    isLoggedIn (val) {
      if (!val) this.$router.push({ name: 'Home' })
    }
  },
  async mounted () {
    Limiter.create('tootcheck', 10000)
    this.randomStr = this.getRandomString()
    if (!this.isLoggedIn) this.$router.push({ name: 'Home' })
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="less" scoped>
.oauth-container {
  height: 350px;
  width: 370px;
  -webkit-box-shadow: 0 10px 40px 0 rgba(0,0,0,.1);
  box-shadow: 0 10px 40px 0 rgba(0,0,0,.1);
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
  &-icon {
    height: 50px;
    object-fit: cover;
  }
  &-steps {
    flex: 1;
    &-title {
      margin-top: 10px;
    }
    &-oauth {
      margin: 10px auto 10px;
      &-strong {
        font-size: 14px;
        color: red;
      }
    }
    &-input {
      width: 100%;
      margin: 20px auto 20px;
    }
  }
}

.icon {
  margin-left: 5px;
  display: inline-block;
  &:hover {
    color: #4829D6;
  }
  &:active {
    color: #333;
  }
}
</style>
