import Vue from 'vue';

function create(Component, props) {
  if (Vue.prototype.$isServer) return;
  // 组件构造函数如何获取
  // 1. Vue.extend
  // 2. render
  const vm = new Vue({
    // h是createElement, 返回的是VNode
    // $mount 挂载成真实dom
    render: h => h(Component, {props})
  }).$mount()  // 不指定宿主元素，则会创建真实dom，但是不会追加操作。

  // 获取真实dom
  document.body.appendChild(vm.$el)
  // 获取组件实例返回
  const comp = vm.$children[0]
  // 删除
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}

export default create