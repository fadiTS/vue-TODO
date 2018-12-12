import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import VueWorker from 'vue-worker';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.use(VueWorker);

export const serverBus = new Vue();

new Vue({
  render: h => h(App)
}).$mount('#app')
