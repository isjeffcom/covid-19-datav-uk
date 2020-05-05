import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './pages/home'
import store from './pages/store'
import storesingle from './pages/storesingle'
import storeup from './pages/storeup'
import fullchart from './pages/fullchart'
import slots from './pages/slots'


// Router, ready for multiple page

export default new VueRouter({
  mode: 'hash',
  base: "/",
  routes: [
    // Home
    { path:'/', name:'home', component: home },
    { path:'/index.html', name:'index', redirect: home },
    { path:'/index', name:'index', redirect: home },

    // Store
    { path:'/store', name:'store', component: store },
    { path:'/storeup', name:'storeup', component: storeup },
    { path:'/fullchart', name:'fullchart', component: fullchart},
    { path:'/storesingle', name:'storesingle', component: storesingle},

    // Store Slot
    { path:'/slots', name:'slots', component: slots}
  ]
})