import { createApp } from 'vue';
import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import { authStore } from './store/auth-store';
import { bioversStore } from './store/biovers-store';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    auth: {
      isAuthenticate: state.auth.isAuthenticate,
      username: state.auth.username,
    },
  }),
});

const store = createStore({
  modules: {
    auth: authStore,
    biovers: bioversStore,
  },
  plugins: [vuexLocal.plugin],
});

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
