import { useStore } from './store.js';
import { watchEffect } from 'vue';

const { username } = useStore();

watchEffect(() => {
  console.log("save the username in local storage (but dont!): ", username.value);
});

