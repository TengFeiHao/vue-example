import Vue from 'vue'
import VueRouter from 'vue-router'

// 为啥使用use 说明vueRouter 是一个vue插件，必须使用use方法注册
// this.$router可以访问Router的实例，在main.js 中new Vue 的时候挂载了router，其实就是内部Vue.prototype.$router 进行了挂载
// 实现并且注册两个全局组件 router-view  router-link 
Vue.use(VueRouter)

const routes = [
  {
    path: '/form',
    name: 'form',
    component: () => import ('../views/form/Index')
  },
  {
    path: '/slot',
    name: '插槽',
    component: () => import ('../views/slot/Slot')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
