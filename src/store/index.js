import Vue from 'vue'
import Vuex from 'vuex'

import API from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userAvatar: '',
    username: '',
    userProfile: {},
    userId: 0
  },
  mutations: {
    setLoggedIn (state, status) {
      state.isLoggedIn = status
    },
    setUserAvatar (state, avatar) {
      state.userAvatar = avatar
    },
    setUsername (state, username) {
      state.username = username
    },
    setUserProfile (state, profile) {
      state.userProfile = profile
    },
    setUserId (state, id) {
      state.userId = id
    }
  },
  actions: {
    async logIn ({ commit }, data) {
      commit('setLoggedIn', true)
      const profile = await API.Matataki.getUserProfile(data.id)
      const avatar = await API.Matataki.getAvatarUrl(profile.data.data.avatar)
      commit('setUsername', profile.data.data.nickname)
      commit('setUserId', data.id)
      commit('setUserAvatar', avatar)
      commit('setUserProfile', profile.data.data)
    },
    logOut ({ commit }) {
      commit('setLoggedIn', false)
      commit('setUsername', '')
      commit('setUserId', 0)
      commit('setUserAvatar', '')
      commit('setUserProfile', {})
    }
  },
  modules: {
  }
})
