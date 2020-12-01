<template>
  <router-link :to="{ name: item.path }">
    <div class="auth-method">
      <div class="auth-method-imagebox" >
        <img :src="methodImage" />
      </div>
      <div class="auth-method-subtitle" :style="'background-color:' + item.color + ';'">
        <span>{{ item.methodName }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>

import oauthIcon from '@/assets/oauth.png'
import qrcodeIcon from '@/assets/qrcode.png'
import authIcon from '@/assets/auth.png'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    methodImage () {
      const method = this.item.method
      if (method === 'qrcode') return qrcodeIcon
      else if (method === 'oauth') return oauthIcon
      else return authIcon
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: white;
}

.auth-method {
  display: flex;
  justify-content: center;
  flex-direction: column;
  &-imagebox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    img {
      height: 80px;
      object-fit: contain;
    }
  }
  &-subtitle {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    span {
      color: white;
    }
  }
}

.auth-method {
  height: 180px;
  width: 280px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1), 0 6px 10px rgba(0,0,0,0.22);
  &:hover {
    transform: translateX(-2px);
    transform: translateY(2px);
    box-shadow: -10px 10px 10px rgba(0,0,0,0.1), 0 6px 10px rgba(0,0,0,0.22);
  }
  &:active {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1);
  }
}
</style>
