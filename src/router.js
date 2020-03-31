import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './pages/home'
import addstore from './pages/addStore'

// Router, ready for multiple page

export default new VueRouter({
  mode: 'history',
  routes: [
    { path:'/', name:'Home', component: home },
    { path:'/addstore', name:'addstore', component: addstore },
    /*{ path: '/home', name: 'home', component: home },*/
    ]
})