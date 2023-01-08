import router from "./index";
import Cookie from 'js-cookie'
router.beforeEach((to, from, next) => {
  // console.log('to.name:',to.name)
  // console.log('from.name:',from.name)
  const token = Cookie.get('token')
  if(!token && to.name !== 'login') {
    // console.log('未登录')
    next({name: 'login'})
  } else if(token && to.name === 'login') {
    // console.log('已经登录不能重复登录')
    next({name: 'index'})
  } else {
    // console.log('直接跳转')
    next()
  }
})