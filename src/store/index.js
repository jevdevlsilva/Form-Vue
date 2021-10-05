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
    DESTROY_USER(state, user) {
      user = {};
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit("CHANGE_USER", payload);
    },
    deleteUser({ commit }, payload) {
      commit("DESTROY_USER", payload);
    },
  },
  modules: {},
});
