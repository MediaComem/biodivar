import { ref } from 'vue';

const mapOpen = ref(false);

export function mapStore() {
  return { mapOpen };
}
