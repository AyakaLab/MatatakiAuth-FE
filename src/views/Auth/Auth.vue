<template>
  <Layout>
    <div class="main-title">选择你的平台</div>
    <div class="platformcard-container">
      <PlatformCard v-for="(item, index) of availableList" :key="index" :item="item" />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import PlatformCard from '@/components/PlatformCard.vue'

import bilibiliIcon from '@/assets/bilibili_blue.png'
import mastodonIcon from '@/assets/mastodon.png'
import { mapState } from 'vuex'

export default {
  components: {
    Layout,
    PlatformCard
  },
  data () {
    return {
      icon: {
        bilibili: bilibiliIcon,
        mastodon: mastodonIcon
      },
      availableList: [
        {
          name: 'bilibili',
          displayName: 'Bilibili',
          path: 'AuthBilibili',
          logo: bilibiliIcon,
          color: '#59C2DF',
          status: 0
        },
        {
          name: 'mastodon',
          displayName: 'Mastodon',
          path: 'AuthMastodon',
          logo: mastodonIcon,
          color: '#4888CE',
          status: 0
        }
      ]
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  watch: {
    isLoggedIn (val) {
      if (!val) this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    if (!this.isLoggedIn) this.$router.push({ name: 'Home' })
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
