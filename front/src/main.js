import Vue from 'vue'
import App from './App.vue'
import Trend from 'vuetrend'


Vue.config.productionTip = false
Vue.use(Trend)

new Vue({
  render: h => h(App),
}).$mount('#app')
