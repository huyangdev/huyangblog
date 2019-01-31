
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import router from './router'

// 设置 el-ui 组件的全局属性
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  router
})
