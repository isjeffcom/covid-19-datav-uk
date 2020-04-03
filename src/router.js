import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './pages/home'
import addstore from './pages/addStore'
import fullchart from './pages/fullchart'

// Router, ready for multiple page

export default new VueRouter({
  mode: 'history',
  routes: [
    { path:'/', name:'home', component: home },
    { path:'/addstore', name:'addstore', component: addstore },
    { path:'/fullchart', name:'fullchart', component: fullchart}
    /*{ path: '/home', name: 'home', component: home },*/
    ]
})