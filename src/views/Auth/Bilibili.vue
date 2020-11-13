<template>
  <Layout>
    <div class="main-title">选择验证方式</div>
    <div class="platformcard-container">
      <AuthMethodCard v-for="(item, index) of availableList" :key="index" :item="item" />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import AuthMethodCard from '@/components/AuthMethodCard.vue'

export default {
  components: {
    Layout,
    AuthMethodCard
  },
  data () {
    return {
      availableList: [
        {
          method: 'qrcode',
          methodName: '扫码登录',
          path: 'BilibiliQRAuth',
          color: '#59C2DF'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main-title {
  margin: 100px auto 40px;
  font-size: 24px;
}

.platformcard-container {
  margin: 20px 200px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
  grid-gap: 48px 60px;
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 992px) {
  .platformcard-container {
    margin: 20px 200px 20px;
  }
}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 640px) {
  .platformcard-container {
    margin: 20px 150px 20px;
  }
}

@media screen and (max-width: 480px) {
  .platformcard-container {
    margin: 20px 20px 20px;
  }
}
</style>
