import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './pages/home'


export default new VueRouter({
  mode: 'history',
  routes: [
    { path:'/', name:'Home', component: home }
    /*{ path:'/', name:'Home', redirect: '/home' },
    { path: '/home', name: 'home', component: home },*/
    ]
})