import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '*',
  //   redirect: '/login'   
  // },
  {
    path: '/login',
    name: 'login',
    label: '登录页',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'main',
    redirect: '/index',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/perpon',
        name: 'perpon',
        label: '个人中心',
        component: () => import('../views/layout/Perpon.vue')
      },
      // {
      //   path: '/index',
      //   name: 'index',
      //   label: '首页',
      //   component: () => import('../views/home/Home.vue')
      // },   
      // {
      //   path: '/user',
      //   name: 'user',
      //   label: '用户管理',
      //   component: () => import('../views/user/User.vue')
      // },   
      // {
      //   path: '/menu',
      //   name: 'menu',
      //   label: '菜单管理',
      //   component: () => import('../views/menu/Menu.vue')
      // },  
      // {
      //   path: '/pageOne',
      //   name: 'pageOne',
      //   label: '其他页面一',
      //   component: () => import('../views/other/OtherOne.vue')
      // },  
      // {
      //   path: '/pageTwo',
      //   name: 'pageTwo',
      //   label: '其他页面二',
      //   component: () => import('../views/other/OtherTwo.vue')
      // },   
      
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 避免重复点击同一个路由出现错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}




export default router