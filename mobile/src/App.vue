<script setup>
  import BaseModal from './components/base/BaseModal.vue';
  import TheLogin from './components/TheLogin.vue';
  import TheApp from './components/TheApp.vue';

  import { ref } from '@vue/reactivity';
  import { getBiovers } from './utils/api.js';
  import { isAuth } from './store.js';

  const isLoading = ref(true);

  getBiovers().then(biovers => {
    isLoading.value = false;
    if (biovers?.statusCode !== 200) return;
    isAuth.value = true;
  });

</script>

<template>
  <div v-if="isLoading">
    <base-modal/>
  </div>
  <div v-else-if="!isAuth">
    <base-modal>
      <the-login></the-login>
    </base-modal>
  </div>
  <div v-else>
    <the-app></the-app>
  </div>
</template>

<style>
  * { box-sizing: border-box }
  #app { height: 100% }
</style>