<template>
  <div class="header-container">
    <router-link :to="{ name: isLoggedIn ? 'Auth' : 'Home' }">
      <img :src="apps" class="logo left-one"/>
    </router-link>
    <div style="flex: 1;"> </div>
    <router-link :to="{ name: 'Home' }">
      <img :src="logo" class="logo"/>
    </router-link>
    <div style="flex: 1;"> </div>
    <el-tooltip class="item" effect="dark" content="如果与你选择的网络不正确，请试试刷新网页" placement="bottom">
      <div v-if="networkError" class="network-indicator network-error">
        <span>{{ networkIndicator }}</span>
      </div>
      <div v-else class="network-indicator">
        <span>{{ networkIndicator }}</span>
      </div>
    </el-tooltip>
    <el-dropdown
      placement="bottom-start"
      v-if="isLoggedIn"
      class="user-menu"
    >
      <div class="user-avatar">
        <img
          v-if="userAvatar"
          :src="userAvatar || defaultAvatar"
          alt="user avatar"
          class="avatar"
        >
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dorpdown"
      >
        <div
          class="link border-br-bl"
          @click="signOut"
        >
          <el-dropdown-item icon="el-icon-error">
            登出
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown
      placement="bottom-start"
      v-else
      class="user-menu"
    >
      <div class="user-avatar">
        <img
          :src="defaultAvatar"
          alt="user avatar"
          class="avatar"
        >
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dorpdown"
      >
        <div
          class="link border-br-bl"
          @click="signIn"
        >
          <el-dropdown-item icon="el-icon-user-solid">
            登录
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import apps from '@/assets/apps.png'
import defaultAvatar from '@/assets/default_avatar.png'
import { mapActions, mapState } from 'vuex'
import { getCookie, clearCookie } from '../../utils/cookie'

export default {
  data () {
    return {
      logo: logo,
      apps: apps,
      defaultAvatar: defaultAvatar,
      networkError: false,
      networkIndicator: '未登录'
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'userAvatar', 'network'])
  },
  watch: {
    isLoggedIn (val) {
      this.getNetwork()
    },
    network (val) {
      this.getNetwork()
    }
  },
  methods: {
    ...mapActions(['logIn', 'logOut']),
    signIn () {
      window.location = 'https://developer.matataki.io/app/e07431eac495fad8/oauth'
    },
    signOut () {
      clearCookie('matataki_token')
      clearCookie('matataki_network')
      this.logOut()
    },
    getNetwork () {
      const n = getCookie('matataki_network')
      console.log('cookie:', n)
      console.log('data:', this.network)
      if (n === 'test' || this.network === 'test') {
        this.networkIndicator = '测试网'
      } else if (n === 'main' || this.network === 'main') {
        this.networkIndicator = '正式网'
      } else {
        if (this.networkError && this.isLoggedIn) this.networkIndicator = '网络错误'
        else this.networkIndicator = '未登录'
      }
    }
  },
  mounted () {
    this.getNetwork()
  }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
}

.network-error {
  background-color: #fa3b3b !important;
}

.network-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 90px;
  top: 22px;
  background-color: #4D39D7;
  border-radius: 4px;
  padding: 5px 8px;
  span {
    font-size: 14px;
    color: white;
  }
}

.logo {
  height: 50px;
  margin: 10px auto 10px;
}

.left-one {
  margin-left: 20px;
  &:hover {
    filter: brightness(0.9);
  }
}

.avatar {
  margin: 10px auto 10px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.header-container {
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

@media screen and (max-width: 640px) {
  .logo {
    transform: scale(0.7);
  }

  .left-one {
    transform: scale(0.7);
  }

  .avatar {
    transform: scale(0.7);
  }
}
</style>
