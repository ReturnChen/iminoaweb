import Vue from 'vue'
import Vuex from 'vuex'
import _ from "lodash";
Vue.use(Vuex)

const state = {
  // 菜单显示/隐藏
  menucollapse: true,
  // 是否登录
  login: false,
  // 顶部菜单数据
  tagsData: [
    { label: "首页", path: '/', effect: "dark", closable: false }
  ]
}

const getters = {
  //
}

const mutations = {
  changemenucollapse_Mutations (state) {
    state.menucollapse = !state.menucollapse
  },
  login_Mutations (state, payload) {
    state.login = payload
  },
  tagsData_Mutations (state, payload) {
    let temp = state.tagsData
    temp.push(payload)
    // 去重
    let tagsData = _.uniqBy(temp, 'path')
    state.tagsData = tagsData
  },
  tagsData_splice_Mutations (state, payload) {
    state.tagsData.splice(payload, 1);
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