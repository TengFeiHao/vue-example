// 插件
// 1. 实现一个install方法

let HVue;

class HVueRouter {
  constructor(options) {
    
    this.$options = options

    // 实现一个响应式
    // 数据响应式，当数据变化的时候，让与数据相关的视图发生变化
    // HVue.util.defineReactive 隐藏的一个api defineReactive(当前对象, 设置一个新的属性, 属性值)
    // this.current = '/' 这种写法不会触发数据的响应式 因为 this.current 不是响应式数据
    // defineReactive 其实就是封装的 Object.defineProperty 利用其get set 方法实现数据的响应式
    const initial = window.location.hash.slice(1) || '/'
    HVue.util.defineReactive(this, 'current', initial)

    // 监听事件
    window.addEventListener('hashchange', this.hashChange.bind(this))
    // 用户刷新页面的时候也处理一下
    window.addEventListener('load', this.hashChange.bind(this));

    // 优化：缓存一下路由的映射关系
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  hashChange() {
    // 通过defineReactive 让current 变成一个响应式的数据，每次数据变化的时候都会去执行render函数，渲染视图更新
    this.current = window.location.hash.slice(1)
  }
}

// 形参是Vue的构造函数
// 调用Vue.use install方法就会被执行，但是use执行在 new Vue({ router }) 之前，此时还拿不到Router的实例，所以
// 采用混入 mixin 借助Vue的beforeCreate 的生命周期的钩子函数，在特定的时间去完成挂载
HVueRouter.install = function(Vue) {
  // 保存一下Vue的构造函数 
  HVue = Vue
  // 1. 挂载$router

  Vue.mixin({
    beforeCreate() {
      // 全局混入，将来在组件化实例的时候才执行
      // 此时Router实例就已经存在了
      // this 指的是组件实例  main.js 中的 new Vue({ router }) 中的router 其实就是为了在这(this.$options)可以拿到router
      // vm.$options用于当前Vue实例的初始化选项，需要在选项中包含自定义property时会有用处
      if(this.$options.router) {  // 避免重复混入
        Vue.prototype.$router = this.$options.router;
      }
    }
  })
  
  // 2. 实现两个全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    // h是createElement函数
    render(h) {
      // 也可以适应jsx语法，但是需要有专门的loader去解析
      // return <a href={ `#${ this.to }` }>{ this.$slots.default }</a>

      // h(tag, props, children)

      return h(
        'a',
        {
          attrs: {
            href: `#${ this.to }`
          }
        },
        this.$slots.default
      )
    }
  })
  // router-view 是一个容器
  Vue.component('router-view', {
    render(h) {
      // 获取路由实例
      // const routes = this.$router.$options.routes
      // const current = this.$router.current
      // const route = routes.find(route => route.path === current)
      // const comp = route ? route.component : null

      // 优化：避免每次的查找，使用之前缓存的映射关系
      const { routeMap, current } = this.$router
      const comp = routeMap[current] ? routeMap[current].component : null

      // 获取路由表，渲染路由对应的component
      return h(comp)
    }
  })
}

export default HVueRouter