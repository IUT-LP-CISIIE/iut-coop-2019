import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vp = new VuexPersist({
  key : 'store',
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [vp.plugin],
  state: {
  	membre : false,
  	token_session : false
  },
  mutations: {
    setSessionMembre(state,data) {
      state.membre = data.member;
      state.token_session = data.token;
    }
  },
  actions: {
  },
  modules: {
  }
})
