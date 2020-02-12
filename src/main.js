import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';

import Fonts from '@/utils/fonts';
Vue.use(Fonts);

import IpcPlugin from '@/utils/ipcPlugin';
Vue.use(IpcPlugin);

import '@/utils/uuid.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
