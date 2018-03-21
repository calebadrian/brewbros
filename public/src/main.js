// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//@ts-ignore
import App from './App'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import Raters from 'vue-rate-it'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)
Vue.component('fa-rating', Raters.FaRating);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
