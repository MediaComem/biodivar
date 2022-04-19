import { createApp } from 'vue';
import App from './App.vue';

import BaseModal from './components/base/BaseModal.vue';
import BaseForm from './components/base/BaseForm.vue';
import BaseMessage from './components/base/BaseMessage.vue';

import './composables/localStorage.js';

createApp(App)
  .component('BaseModal', BaseModal)
  .component('BaseForm', BaseForm)
  .component('BaseMessage', BaseMessage)
  .mount('#app');
