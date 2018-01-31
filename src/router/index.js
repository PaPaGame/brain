import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import NewLogin from '@/views/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/newlogin",
      name: "newlogin",
      component: NewLogin
    }
  ]
})
