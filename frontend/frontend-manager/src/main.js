import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import { authStore } from './store/auth-store';

createApp(App)
  .use(ElementPlus)
  .use(authStore)
  .use(router)
  .mount('#app');
