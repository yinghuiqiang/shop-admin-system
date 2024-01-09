import { createRouter, createWebHashHistory } from 'vue-router'
import MainBox from '../views/MainBox'
import Login from '../views/login'
import configRouters from './config'
import store from '../store'
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/mainbox',
    name:'mainbox',  // name是方便下面添加路由
    component:MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }else{
    if(!localStorage.getItem('token')){
      next({
        path:'/login'
      })
    }else{
      // 这里需要判断是否是第一次，因为如果判断是否第一次会出现死循环
      // path:to.fullPath  又重新添加了路由 重新跳转了路径
      if(!store.state.isGetterRouter){
        router.removeRoute('mainbox')
        routerAdd()
        next({
          path:to.fullPath
        })
      }else{
        next()
      }
    }
  }
  // console.log(to,from,next);
})

const routerAdd =()=>{
  // 判断当前主路由中是否存在mainbox
  if(!router.hasRoute("mainbox")){
    router.addRoute(  {
      path: "/mainbox",
      name: "mainbox",
      component: MainBox
    })
  }
  configRouters.forEach(item=>{
    checkPermission(item) && router.addRoute('mainbox',item)
  })
  // 当添加完路由之后，将状态改为true，
  // 表示已经是第二次加载了，不用重新添加路由
  store.commit('changeRouterGetterState',true)
}
const checkPermission = (item)=>{
  if(item.requireAdmin){
    return store.state.userInfo.role == 1 || store.state.userInfo.role == 4 
  }
  return true
}


export default router
