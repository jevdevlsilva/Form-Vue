import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    users: [],
  },
  mutations: {
    CHANGE_USER(state, user) {
      state.user = { ...state.user, ...user };
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit("CHANGE_USER", payload);
    },
  },
  modules: {},
});
