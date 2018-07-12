declare const Vue: any;
declare const VueRouter: any;
const VueChatScroll = require('vue-chat-scroll');
require('./filters/chat.filters');

import mainComponent from './components/main/main.component';
import chatComponent from './components/chat/chat.component';

const routes = [{ path: '/', component: mainComponent }, { path: '/chat', component: chatComponent }];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
}).$mount('#app');

Vue.use(VueChatScroll);
