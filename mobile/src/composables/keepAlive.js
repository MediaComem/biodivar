import { ref } from '@vue/reactivity';
import { storage } from './localStorage.js';
import { useStore } from './store.js';
import { isLogged } from '../utils/api.js';

const { removeUser } = storage();

const { isAuth, username } = useStore();

const pinger = ref(null);

const setupKeepAlive = () => {
    pinger.value = setInterval(() => {
      isLogged().then(resp => {
        if (resp?.statusCode !== 200) {
          isAuth.value = false;
          removeUser();
          username.value = '';
          clearInterval(pinger.value);
          return;
        }
      })
    }, 5000)
  }

  export function keepAlive() {

    return { setupKeepAlive };
  
  }