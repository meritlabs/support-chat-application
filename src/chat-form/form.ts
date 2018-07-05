declare const Vue: any;
declare const VueRouter: any;

import mainComponent from './components/main/main.component';

const routes = [{ path: '/', component: mainComponent() }];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  data: {
    message: 'test',
  },
}).$mount('#app');
