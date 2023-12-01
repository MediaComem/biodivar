<template>
  <div>
    <BioverPin />
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover"/>
    </div>
    <Return link="#menu" text="CARTE"/>
    <div>
      <Map />
    </div>
    <div class="upload-layout">
      <GeoJsonImporter />
      <ZipImporter />
    </div>
    <div>
      <BioversSelection />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';

import { useStore } from '../composables/store.js';

import Map from '../components/TheAdmin/biovers/Map/Map.vue';
import BioverPin from '../components/app/UIElement/BioversPin.vue';
import Return from '../components/app/UIElement/Return.vue';
import BioversSelection from '../components/TheAdmin/biovers/Data/BioversSelection.vue';
import BioversItem from '../components/app/BioversItem.vue';
import GeoJsonImporter from '../components/TheAdmin/biovers/Import/GeoJsonImporter.vue';
import ZipImporter from '../components/TheAdmin/biovers/Import/ZipImporter.vue';

export default {
  components: {
    Map,
    BioverPin,
    Return,
    BioversSelection,
    GeoJsonImporter,
    BioversItem,
    ZipImporter,
  },
  methods: {
    ...mapActions('biovers', ['getBiovers', 'resetBiovers', 'loadPoiColumns', 'loadPathColumns', 'loadTraceColumns', 'loadEventColumns']),
  },
  computed: {
    pins() {
      const { getPinsBiovers } = useStore();
      return getPinsBiovers();
    },
    ...mapState('biovers', ['ownBiovers', 'bioversToDisplay', 'currentBioversId']),
    ...mapGetters('biovers', ['getPoiColumnsPreference', 'getPathColumnsPreference', 'getTraceColumnsPreference', 'getEventColumnsPreference']),
  },
  async mounted() {
    if (this.getPoiColumnsPreference === undefined) {
      this.loadPoiColumns();
    }
    if (this.getPathColumnsPreference === undefined) {
      this.loadPathColumns();
    }
    if (this.getTraceColumnsPreference === undefined) {
      this.loadTraceColumns();
    }
    if (this.getEventColumnsPreference === undefined) {
      this.loadEventColumns();
    }
  },
};
</script>

<style scoped>
.upload-layout {
  width: 100%;
}
</style>
