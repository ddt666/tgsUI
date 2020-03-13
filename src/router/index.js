import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import store from '@/store'


import Layout from '@/components/Layout'
import Media from '@/components/media'
import NewMedia from '@/components/media/NewMedia'
import Service from '@/components/service'

import EditPlan from '@/components/plan/newplan'
import PlanList from '@/components/plan/List'
import Plan from '@/components/plan'
import Settlement from '@/components/plan/Settlement'
import Statement from '@/components/statement'
import MediaStatement from '@/components/statement/media'
import AdvertStatement from '@/components/statement/advert'

import Login from '@/components/login'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        noAuth: true
      }

    },

    {
      path: '/',
      name: 'Index',
      component: Layout,
      redirect: {name: "Plan"},
      meta: {
        title: "首页"
      },
      children: [

        // {
        //   path: "/newPlan",
        //   name: "NewPlan",
        //   component: NewPlan
        // },

        {
          path: "/plan",
          name: "Plan",
          component: Plan,
          redirect: {name: 'PlanList'},
          meta: {
            title: "计划管理"
          },
          children: [
            {
              path: 'list',
              name: "PlanList",
              component: PlanList,
              meta: {
                title: "计划列表"
              }
            },
            {
              path: 'new',
              name: "NewPlan",
              component: EditPlan,
              meta: {
                title: "新建计划"
              }
            },
             {
              path: 'edit/:plan_id',
              name: "EditPlan",
              component: EditPlan,
              meta: {
                title: "编辑计划"
              },
            },
            {
              path: "Settlement/:plan_id",
              name: "PlanSettlement",
              component: Settlement,
              meta: {
                title: "数据录入"
              }
            },
             {
              path: '/copy',
              name: "CopyPlan",
              component: EditPlan,
              meta: {
                title: "拷贝计划"
              },
            }
          ]
        },
        //
        // // Settlement


        {
          path: "/statement",
          name: "Statement",
          component: Statement,
          redirect: {name: 'mediaStatement'},
          meta: {
            title: "对账"
          },
          children: [
            {
              path: "media",
              name: "mediaStatement",
              component: MediaStatement,
              meta: {
                title: "媒体对账"
              }
            },
            {
              path: "advert",
              name: "advertStatement",
              component: AdvertStatement,
              meta: {
                title: "客户对账"
              }
            },
          ]
        },

      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  // ...
  console.log(to, from, VueCookies.isKey("token"))
  if (to.meta && to.meta.noAuth) {
    next()
  } else {
    if (VueCookies.isKey("token")) {
      console.log("store.getters.hasUserInfo", store.getters.hasUserInfo)
      if (!store.getters.hasUserInfo) {
        store.dispatch("getUserInfo").then(res => {
          console.log(res)
        })
      }

      next()
    } else {
      next({name: "Login"})
    }
  }


  // console.log(store.getters.hasUserInfo)
  // if (to.meta && to.meta.noAuth) {
  //   // console.log("meta")
  //
  //   next()
  // } else if (store.getters.hasUserInfo) {
  //   next()
  // } else {
  //   store.dispatch("getUserInfo").then(res => {
  //     console.log(res)
  //   })
  // }
  //next()
})

export default router
