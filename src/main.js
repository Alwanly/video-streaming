import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
  ApiServices
} from "./services";
ApiServices.init(process.env.VUE_APP_API);
Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import("../src/components/Videos.vue")
  },
  {
    path: '/videos/:id',
    name: "player",
    component: () => import("../src/components/Player.vue")
  }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')