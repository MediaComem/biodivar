import { onMounted, onUnmounted } from 'vue';

export function useEventListener(target, event, callback) {

  onMounted(() => {
    if (typeof target === 'string' || target instanceof String) {
      target = document.querySelector(target);
    }
    target.addEventListener(event, callback);
  });
  onUnmounted(() => target.removeEventListener(event, callback));

}