import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import { bioversStore } from './biovers-store';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    biovers: {
      userPreference: state.biovers.userPreference,
    },
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const store = createStore({
  modules: {
    biovers: bioversStore,
  },
  plugins: [vuexLocal.plugin],
});
