<template>
  <Layout>
    <div class="main-container">
      <div class="main-title">
        <div class="main-title-one">Matataki Auth</div>
        <div class="main-title-sub">下一代全新的社交聚合验证中心</div>
      </div>
      <div class="main-image">
        <img :src="chartIcon" class="main-image-one"/>
        <img :src="accountIcon" class="main-image-two"/>
        <img :src="serviceIcon" class="main-image-thd"/>
        <img :src="safetyIcon" class="main-image-for"/>
        <img :src="balancerIcon" class="main-image-fiv"/>
      </div>
      <el-button plain round type="primary" class="main-button">现在开始</el-button>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

import serviceIcon from '@/assets/service.png'
import accountIcon from '@/assets/account.png'
import balancerIcon from '@/assets/balancer.png'
import safetyIcon from '@/assets/safety.png'
import chartIcon from '@/assets/chart.png'

export default {
  name: 'Home',
  components: {
    Layout
  },
  data () {
    return {
      serviceIcon: serviceIcon,
      accountIcon: accountIcon,
      balancerIcon: balancerIcon,
      safetyIcon: safetyIcon,
      chartIcon: chartIcon
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  margin-top: 100px;
}

.main-title {
  animation-name: fadeOut;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  &-one {
    font-size: 50px;
  }
  &-sub {
    font-size: 20px;
  }
}

.main-image {
  margin: 100px auto 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  &-one {
    height: 150px;
    width: 150px;
    object-fit: cover;
    margin-right: 20px;
    filter: opacity(0.5);
    animation-name: leftOneExpand;
    animation-duration: 3s;
    animation-timing-function: ease;
  }
  &-two {
    height: 200px;
    width: 200px;
    object-fit: cover;
    margin-right: 20px;
    filter: opacity(0.75);
    animation-name: leftTwoExpand;
    animation-duration: 2.5s;
    animation-timing-function: ease;
  }
  &-thd {
    height: 300px;
    animation-name: fadeOut;
    animation-duration: 2s;
    animation-timing-function: ease;
  }
  &-for {
    height: 200px;
    width: 200px;
    object-fit: cover;
    margin-left: 20px;
    filter: opacity(0.75);
    animation-name: rightTwoExpand;
    animation-duration: 2.5s;
    animation-timing-function: ease;
  }
  &-fiv {
    height: 150px;
    width: 155px;
    object-fit: fill;
    margin-left: 20px;
    filter: opacity(0.5);
    animation-name: rightOneExpand;
    animation-duration: 3s;
    animation-timing-function: ease;
  }
}

.main-button {
  margin-top: 80px;
  animation-name: fadeOut;
  animation-duration: 2.5s;
  animation-timing-function: ease;
}

@keyframes fadeOut {
  0%,
  50% {
    filter: opacity(0);
  }
  100% {
    filter: opacity(1);
  }
}

@keyframes leftOneExpand {
  0%,
  50% {
    filter: opacity(0);
    transform: translateX(300px);
  }
  100% {
    filter: opacity(0.5);
  }
}

@keyframes leftTwoExpand {
  0%,
  50% {
    filter: opacity(0);
    transform: translateX(150px);
  }
  100% {
    filter: opacity(0.75);
  }
}

@keyframes rightOneExpand {
  0%,
  50% {
    filter: opacity(0);
    transform: translateX(-320px);
  }
  100% {
    filter: opacity(0.5);
  }
}

@keyframes rightTwoExpand {
  0%,
  50% {
    filter: opacity(0);
    transform: translateX(-150px);
  }
  100% {
    filter: opacity(0.75);
  }
}

@media screen and (max-width: 1200px) {
  .main-container {
    margin-top: 100px;
    margin-bottom: 0px;
  }

  .main-image {
    width: 100vw;
    transform: scale(0.9);
    margin-top: 50px;
  }
}

@media screen and (max-width: 992px) {
  .main-container {
    margin-top: 100px;
    margin-bottom: 0px;
  }

  .main-title {
    &-one {
      font-size: 45px;
    }
    &-sub {
      font-size: 22px;
    }
  }

  .main-image {
    width: 100vw;
    transform: scale(0.8);
    margin-top: 50px;
  }
}

@media screen and (max-width: 768px) {
  .main-container {
    margin-top: 100px;
    margin-bottom: 0px;
  }

  .main-button {
    margin-top: 40px;
  }

  .main-title {
    &-one {
      font-size: 42px;
    }
    &-sub {
      font-size: 20px;
    }
  }

  .main-image {
    width: 100vw;
    transform: scale(0.6);
    margin-top: 40px;
  }
}

@media screen and (max-width: 640px) {
  .main-container {
    margin-top: 100px;
    margin-bottom: 0px;
  }

  .main-title {
    &-one {
      font-size: 40px;
    }
    &-sub {
      font-size: 20px;
    }
  }

  .main-image {
    width: 100vw;
    transform: scale(0.5);
    margin-top: 30px;
  }
}

@media screen and (max-width: 480px) {
  .main-container {
    margin-top: 50px;
    margin-bottom: 0px;
  }

  .main-button {
    margin-top: 0px;
  }

  .main-title {
    &-one {
      font-size: 30px;
    }
    &-sub {
      font-size: 16px;
    }
  }

  .main-image {
    width: 100vw;
    transform: scale(0.25);
    margin-top: 0px;
  }
}
</style>
