// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/global/global.css'

// 导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// fade/zoom 等
//import 'element-ui/lib/theme-chalk/base.css';
Vue.use(ElementUI, {size: "small"})

import * as api from './api/index'

Vue.prototype.$service = api

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

//导入store实例
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
