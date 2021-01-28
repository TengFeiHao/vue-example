<template>
  <div>
    <div text-content = "123"></div>
    <slot :foo="fooData"></slot>
    <slot name="content"></slot>
    <slot name="footer" :fooData1="fooData1"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fooData: '**我是子组件中默认插槽的数据**',
      fooData1: '**我是子组件中具名插槽的数据**'
    }
  }
}
</script>