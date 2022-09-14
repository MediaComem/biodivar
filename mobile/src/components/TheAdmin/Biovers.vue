<template>
  <div>
    <p v-if="pins.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" />
    </div>
    <div style="height: 50vh">
      <Map />
    </div>
    <div class="upload-layout">
      <GeoJsonImporter />
    </div>
    <div>
      <BioversSelection />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import { useStore } from '../../composables/store.js';

import Map from './biovers/Map/Map.vue';
import BioversSelection from './biovers/Data/BioversSelection.vue';
import BioversItem from '../app/BioversItem.vue';
import GeoJsonImporter from './biovers/Import/GeoJsonImporter.vue';
import Filter from './biovers/Data/Filter.vue';

export default {
  components: {
    Map,
    BioversSelection,
    GeoJsonImporter,
    Filter,
    BioversItem,
  },
  methods: {
    ...mapActions('biovers', ['getBiovers', 'resetBiovers']),
  },
  computed: {
    pins() {
      const { getPinsBiovers } = useStore();
      return getPinsBiovers();
    },
    ...mapState('biovers', ['ownBiovers', 'bioversToDisplay', 'currentBioversId']),
  },
  async mounted() {
    this.resetBiovers();
    this.getBiovers();
  },
};
</script>

<style scoped>
.upload-layout {
  width: 100%;
}
</style>
