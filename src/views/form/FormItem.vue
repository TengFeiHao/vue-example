<template>
  <div class="formItem">
    <!-- label  -->
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 校验信息的显示 -->
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '../../mixins/emitter';
export default {
  name: 'formItem',
  componentName: 'formItem',
  inject: ['form'],
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
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
    if(this.prop) {
      this.dispatch('TheForm', 'addField', [this])

      this.$on('validate', () => {
        this.validate()
      })
    }
  },
  methods: {
    validate() {
      // 规则 安装async-validator 这个里面封装表单的校验规则（同步，异步），省去自己去写判断
      const rules = this.form.rules[this.prop]
      // 当前值 通过传递进来的prop当做key值
      const value = this.form.model[this.prop]
      // 校验描述对象 校验规则
      const desc = {[this.prop]: rules}
      // 创建Schema的实例
      const schema = new Schema(desc)
      // 校验源
      return schema.validate({[this.prop]: value}, errors => {
        if(errors) {
          this.error = errors[0].message;
        }else {
          this.error = ''
        }
      })
    }
  },
  beforeDestroy() {
    this.dispatch('TheForm', 'removeField', [this]);
  }
}
</script>

<style lang="scss" scoped>
  .formItem {
    margin-bottom: 20px;
    label {
      display: inline-block;
      min-width: 80px;
    }
    .error {
      font-size: 12px;
      color: red;
    }
  }
</style>