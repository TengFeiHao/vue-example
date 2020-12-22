<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有的input 
      // 返回的是一个个promise对象
      const tasks = this.$children
        .filter(item => item.prop)     // 过滤掉没有prop属性的formItem
        .map(item => item.validate());
      // 统一处理所有的promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>