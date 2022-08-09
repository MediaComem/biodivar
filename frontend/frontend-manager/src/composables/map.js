import { ref } from 'vue';

const mapOpen = ref(true);

export function mapStore() {
  return { mapOpen };
}
