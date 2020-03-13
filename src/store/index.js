import Vue from 'vue'
import Vuex from 'vuex'
import * as service from '@/api'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      id: null,
      username: ""
    }

  },
  getters: {
    hasUserInfo: (state) => {

      return state.userInfo.id != null
    }
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = {...data}
    }
  },
  actions: {
    login(context, data) {

      return new Promise((resolve, reject) => {
        service.login(data).then(res => {
          console.log(res)
          VueCookies.set("token", res.token)
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    logout(context) {

      return new Promise((resolve, reject) => {
        service.logout().then(res => {

          VueCookies.remove("token")
          window.location.reload()
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    getUserInfo(context, state) {
      return new Promise((resolve, reject) => {
        service.getUserInfo()
          .then(res => {
            // console.log("用户信息",res)
            if (res.code === 1000) {
              context.commit("SET_USERINFO", res.data)
              resolve(res.data)
            } else {
              console.log(res.msg)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})

export default store
