let HVue;  
// 实现store类
class Store {
  constructor(options) {
    // 响应式的state 借助vue实例的data实现一个响应式，使用之前的defineReactive（给一个对象实现一个响应式）一样的道理
    // $$state 加两个$ 实现代理，在vue实例上代理的属性隐藏，从而直接在vue实例上无法访问到，需要通过$data/_data 间接拿
    this._vm = new HVue({
      data: {
        $$state: options.state
      }
    })

    // 保存mutations
    this._mutations = options.mutations

    // 保存actions
    this._actions = options.actions

    // 绑定this到store 实例
    const store = this
    const { commit, action } = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload)
    }

    // getters
    // 遍历用户传入的getters所有的key 动态赋值，其值应该是函数的执行结果
    // 确保是响应式的 Object.defineProperty(this.getters, key, { get() {} })
    // 缓存结果，可以利用computed
  }

  // 存取器 封装一层防止外界修改  _data 就相当于 $data https://cn.vuejs.org/v2/api/#data
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.log('please use replaceState to reset state')
  }

  // commit(type, payload): 执行mutation，修改状态
  commit(type, payload) {
    // 根据type获取对应的mutation
    const entry = this._mutations[type]
    if(!entry) {
      return console.error('unknown mutation type');
    }
    entry(this.state, payload)
  }

  // dispatch(type, payload)
  dispatch(type, payload) {
    // 根据type获取对应的action
    const entry = this._actions[type]
    if(!entry) {
      return console.error('unknown action type');
    }
    return entry(this, payload)
  }
}
 
// 实现一个插件

function install(Vue) {
  HVue = Vue

  // 混入 挂载时机
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
   
}

// 此处导出的对象理解为Vuex
export default { Store, install } 