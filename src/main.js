import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/tomorrow.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCode, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import marked from 'marked';
import highlight from 'highlight.js';

[faBars, faCode, faMoon, faGithub, faTwitter]
    .forEach(i => library.add(i));

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;

const renderer = new marked.Renderer();
marked.Renderer.prototype.oldcode = marked.Renderer.prototype.code;

renderer.code = function(code, infostring, escaped) {
  return this.oldcode(code, infostring, escaped).replace('class="language-', 'class="hljs language-')
};

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlight(lang, code).value;
  },
  renderer
});

Vue.prototype.$api = 'https://api.epita.litarvan.com';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
