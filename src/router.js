import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import About from './views/About.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/a/aled'
    },
    {
      path: '/a/:id',
      name: 'article',
      component: Main
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});

export default router;
