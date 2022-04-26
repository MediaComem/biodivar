import { createApp } from 'vue';
import App from './App.vue';

import i18n from './plugins/vue-i18n';

import BaseButton from './components/base/BaseButton.vue';
import BaseCheckbox from './components/base/BaseCheckbox.vue';
import BaseDialog from './components/base/BaseDialog.vue';
import BaseForm from './components/base/BaseForm.vue';
import BaseInput from './components/base/BaseInput.vue';
import BaseMessage from './components/base/BaseMessage.vue';
import BaseModal from './components/base/BaseModal.vue';
import BaseRadio from './components/base/BaseRadio.vue';


import './composables/localStorage.js';

createApp(App)
  .component('BaseButton', BaseButton)
  .component('BaseCheckbox', BaseCheckbox)
  .component('BaseDialog', BaseDialog)
  .component('BaseForm', BaseForm)
  .component('BaseInput', BaseInput)
  .component('BaseMessage', BaseMessage)
  .component('BaseModal', BaseModal)
  .component('BaseRadio', BaseRadio)
  .use(i18n)
  .mount('#app');
