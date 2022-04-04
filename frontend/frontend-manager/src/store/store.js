import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import { authStore } from './auth-store';
import { bioversStore } from './biovers-store';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    auth: {
      isAuthenticate: state.auth.isAuthenticate,
      username: state.auth.username,
    },
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const store = createStore({
  modules: {
    auth: authStore,
    biovers: bioversStore,
  },
  plugins: [vuexLocal.plugin],
});
