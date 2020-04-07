import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'
import 'leaflet/dist/leaflet.css';
import router from './router.js'

const VueScrollTo = require('vue-scrollto');

Vue.use(VueApexCharts)
Vue.use(VueScrollTo)

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
