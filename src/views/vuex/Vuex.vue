<template>
  <div>
    <p @click="$store.commit('add')">counter: {{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async counter: {{ $store.state.counter }}</p>
    <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
  </div>
</template>