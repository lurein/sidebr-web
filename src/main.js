import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import '../node_modules/bulma/css/bulma.css';
import './main-firebase';

Vue.prototype.$http = axios;
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
