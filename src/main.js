import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import 'bulma/css/bulma.css'


import { outils } from './outils'
Vue.mixin(outils);


window.axios = axios.create({
	baseURL : 'https://tools.sopress.net/iut/coop/api/',
	headers: {
		'Authorization': '12088c23afe1549e04c25c3d4a032a12009f4a9d'
	}
});


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
      window.axios.interceptors.request.use((config) => {
			if(this.$store.state.token_session) {
				config.url+='?token='+this.$store.state.token_session;
			}
        return config
      }, error => {
        return console.log(error)
      })
  }
}).$mount('#app')
