<template>
  <div>
    <Header>
      <!-- header -->
      <!-- 默认插槽用default做为参数，也可以不写 -->
      <!-- <template v-slot:default>header</template> -->

      <!-- 具名插槽用插槽名作为参数 -->
      <h1 slot=content>content</h1>
      <!-- <template v-slot:footer>footer</template> -->

      <!-- 作用域插槽 -->
      <template v-slot:default="slotProps">
        来自子组件的数据--- {{ slotProps.foo }}
      </template>
      <!-- 作用域插槽 直接结构-->
      <!-- <template v-slot:default="{ foo }">
        来自子组件的数据--- {{ foo }}
      </template> -->

      <!-- 作用域插槽 -->
      <template v-slot:footer="slotProps">
        来自子组件的数据--- {{ slotProps.fooData1 }}
      </template>

      <!-- scope slot-scope 已经被v-slot取代，更加简洁 -->
      <!-- <template slot=footer slot-scope="scope">
        {{ scope }}
      </template> -->
    </Header>
  </div>
</template>

<script>
import Header from '@/components/slot/Header.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    Header
  }
}
</script>