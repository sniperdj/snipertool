import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/HomePage.vue'
import iOSJsonBean from '@/components/iOS/MakeBeanClass.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/makeiOSBean',
      name: 'iOSJsonBean',
      component: iOSJsonBean
    },
  ]
})
