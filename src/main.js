import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex/index'
import ElementUI from 'element-ui';
import elementUIVerify from 'element-ui-verify'
import 'element-ui/lib/theme-chalk/reset.css'
import './assets/style/element-variables.scss'
// Mixins
import { tableMixin } from './mixins/tableMixin'
import { commonMixin } from './mixins/commonMixin'
Vue.mixin(tableMixin)
Vue.mixin(commonMixin)
// 全局样式引入
import './assets/style/global.less';
// 全局组件引入
import './components/global'
//改变table header的背景色
Vue.prototype.$tableHeaderColor = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex === 0) {
    return 'background-color: #f5f5f5; height: 40px;'
  }
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(elementUIVerify)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
