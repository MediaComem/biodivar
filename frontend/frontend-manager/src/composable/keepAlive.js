import { ref } from 'vue';
import axios from 'axios';

const pinger = ref(null);

const setupKeepAlive = (element, route) => {
  pinger.value = setInterval(() => {
    axios.get(`${process.env.VUE_APP_URL}/login`, { withCredentials: true }).catch(() => {
      element('authenticate', {
        isAuthenticate: false,
        username: '',
      });
      clearInterval(pinger.value);
      route.push('Login');
    });
  }, 5000);
};

export default setupKeepAlive;
