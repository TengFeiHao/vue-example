<template>
  <div>
    <!-- label  -->
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 校验信息的显示 -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: '',   // error 是空说明校验通过
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>