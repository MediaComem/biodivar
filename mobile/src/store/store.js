import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import { globalStore } from './global-store';
import { bioversStore } from './biovers-store';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    biovers: {
      userPreference: state.biovers.userPreference,
      poiColumnsPreference: state.biovers.poiColumnsPreference,
      pathColumnsPreference: state.biovers.pathColumnsPreference,
      traceColumnsPreference: state.biovers.traceColumnsPreference,
      eventColumnsPreference: state.biovers.eventColumnsPreference,
    },
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const store = createStore({
  modules: {
    global: globalStore,
    biovers: bioversStore,
  },
  plugins: [vuexLocal.plugin],
});
