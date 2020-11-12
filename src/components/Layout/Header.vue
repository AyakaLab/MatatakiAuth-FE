<template>
  <div class="header-container">
    <img :src="apps" class="logo left-one"/>
    <div style="flex: 1;"> </div>
    <img :src="logo" class="logo"/>
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
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import apps from '@/assets/apps.png'

export default {
  data () {
    return {
      logo: logo,
      apps: apps,
      isLoggedIn: true,
      userAvatar: 'https://avatars3.githubusercontent.com/u/11081491?s=460&u=9e6f9289cfd4263253fc39e15cad72ec6fe95235&v=4'
    }
  },
  methods: {
    signOut () {

    }
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
</style>
