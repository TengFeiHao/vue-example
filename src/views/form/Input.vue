<template>
  <div>
    <!-- 自定义组件双向数据绑定： :value @input -->
    <!-- v-bind="$attrs" 展开$attrs 计算属性如下类同-->
    <!-- v-on="inputListeners" 展开$listeners，此处写成一个计算属性，目的结合v-model所需要的方法合并一起被展开设置 -->
    <input v-bind="$attrs" v-on="inputListeners">
  </div>
</template>

<script>
export default {
  name: 'theInput',
  inheritAttrs: false,    // 避免设置到根元素上
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputAttrs() {
      return Object.assign({},
        this.$attrs,
        {value: this.value}
      )
    },
    inputListeners() {
      return Object.assign({},
        this.$listeners,
        {input: this.onInput}
      )
    }
  },
  methods: {
    onInput(e) {
      // 派发一个input 事件，实现双向数据绑定
      this.$emit('input', e.target.value)
      // 通知父级执行校验 父级此时还是个slot 如何派发事件 $emit不适合，$parent $root 可以实现，但是利用父元素或者根元素显然有耦合的问题
      this.$parent.$emit('valid')
    }
  }
}
</script>