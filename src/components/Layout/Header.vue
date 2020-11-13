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
    <el-dropdown
      placement="bottom-start"
      v-if="isLoggedIn"
      class="user-menu"
    >
      <div class="user-avatar">
        <img
          v-if="userAvatar"
          :src="userAvatar"
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

export default {
  data () {
    return {
      logo: logo,
      apps: apps,
      defaultAvatar: defaultAvatar
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'userAvatar'])
  },
  methods: {
    ...mapActions(['logIn', 'logOut']),
    signIn () {
      window.location = 'https://developer.matataki.io/app/e07431eac495fad8/oauth?network=test'
    },
    signOut () {
      this.logOut()
    }
  },
  mounted () {
    console.log(this.isLoggedIn)
  }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
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
