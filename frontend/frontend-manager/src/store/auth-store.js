export const authStore = {
  namespaced: true,
  state() {
    return {
      isAuthenticate: false,
      username: '',
    };
  },
  mutations: {
    authentication(state, payload) {
      state.isAuthenticate = payload.isAuthenticate;
      state.username = payload.username;
    },
  },
  actions: {
    authenticate({ commit }, payload) {
      commit('authentication', payload);
    },
  },
  getters: {
    getAutheticate(state) {
      return state.isAuthenticate;
    },
    getUsername(state) {
      return state.username;
    },
  },
};

export default authStore;
