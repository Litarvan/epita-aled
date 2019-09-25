import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: localStorage.getItem('dark') === 'true' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    sidemenu: false
  },
  mutations: {
    setDark(state, dark) {
      localStorage.setItem('dark', state.dark = dark)
    },
    triggerMenu(state) {
      state.sidemenu = !state.sidemenu;
    }
  }
});
