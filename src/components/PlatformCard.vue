<template>
  <router-link :to="{ name: item.status === 0 ? item.path : 'Auth' }">
    <div class="platform">
      <div class="platform-mask" v-if="item.status !== 0"></div>
      <div class="platform-imagebox" >
        <img :src="item.logo" />
      </div>
      <div class="platform-subtitle" v-if="item.status === 0" :style="'background-color:' + item.color + ';'">
        <span>{{ item.displayName }}</span>
      </div>
      <div class="platform-subtitle" v-else :style="'background-color:' + item.color + ';'">
        <span>🚧 正在施工中 🚧</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: white;
}

.platform {
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

.platform {
  height: 180px;
  width: 280px;
  border-radius: 10px;
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

.platform-mask {
  height: 180px;
  width: 280px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  z-index: 999;
}
</style>
