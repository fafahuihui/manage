import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./router/permisson"
import { addRoute } from './router/addRoute'
import Cookie from 'js-cookie';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    addRoute(Cookie.get('menu')&&JSON.parse(Cookie.get('menu')))    
  },
}).$mount('#app')
