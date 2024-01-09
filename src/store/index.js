import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouter:false,
    isCollapse:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeRouterGetterState(state,value){
      state.isGetterRouter = value
    },
    changeCollapse(state){
      state.isCollapse = !state.isCollapse
    },
    getUserInfo(state,value){
      console.log(state,value);
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isCollapse","userInfo"]  // 是否持久化
  })]
})
