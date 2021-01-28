<template>
  <div id="app">
    <div id="nav">
      <template v-for="(item, index) in routeData">
        <router-link :key="index" :to="item.path">{{ item.name }}</router-link>
        <template v-if="index < routeData.length - 1"> | </template>
      </template>
    </div>
    <!-- 原理？（url变页面跟着变化） -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeData: []
    }
  },
  mounted() {
    this.routeData = this.$router.$options.routes
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
