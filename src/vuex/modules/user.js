import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 用户数据
  user: {}
}

const getters = {
  //
}

const mutations = {
  user_Mutations (state, payload) {
    state.user = payload
  }
}

const actions = {
  //
}

export default {
  // 开启命令空间
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}