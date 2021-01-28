import Vue from 'vue'
import Vuex from './HVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      // state哪里来的？
      state.counter++
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 2000)
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  },
  modules: {
  }
})
