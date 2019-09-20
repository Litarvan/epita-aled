import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: localStorage.getItem('dark') === 'true' || false
  },
  mutations: {
    setDark(state, dark) {
      localStorage.setItem('dark', state.dark = dark)
    }
  }
});
