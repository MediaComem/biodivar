import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: [
    'isAuthenticate',
    'username',
  ],
});

export const authStore = createStore({
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
  plugins: [vuexLocal.plugin],
});

export default authStore;
