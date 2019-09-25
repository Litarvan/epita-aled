import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const saved = localStorage.getItem('dark');

export default new Vuex.Store({
  state: {
    dark: saved === null ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) : saved,
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
