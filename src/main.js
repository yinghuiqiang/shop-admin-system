import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入粒子库
import Particles from 'particles.vue3'

createApp(App)
  .use(Particles)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
