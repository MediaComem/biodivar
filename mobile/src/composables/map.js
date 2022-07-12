import { ref, shallowRef, watchEffect} from 'vue';
import { computeCompass } from '../utils/device.js';

const map = ref(null);
const position = shallowRef([0, 0]);
const yaw = ref(0);

window.addEventListener('gps-position-update', evt => {
  const pos = evt.detail;
  position.value = [pos.latitude, pos.longitude];
});

window.addEventListener('deviceorientationabsolute', event => {
  if (!event.alpha) return;
  if (!event.absolute) return;
  yaw.value = computeCompass(event.alpha, event.beta, event.gamma);
});

export function mapStore() {

    return { map, position, yaw };

  }