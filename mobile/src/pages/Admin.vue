<template>
  <div>
    <p v-if="pins.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover"/>
    </div>
    <div class="return"><a class="link" href="#menu"><img src="../assets/shared/arrow_back.svg"/></a><p class="text">CARTE</p></div>
    <div>
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
import { mapActions, mapState, mapGetters } from 'vuex';

import { useStore } from '../composables/store.js';

import Map from '../components/TheAdmin/biovers/Map/Map.vue';
import BioversSelection from '../components/TheAdmin/biovers/Data/BioversSelection.vue';
import BioversItem from '../components/app/BioversItem.vue';
import GeoJsonImporter from '../components/TheAdmin/biovers/Import/GeoJsonImporter.vue';
import Filter from '../components/TheAdmin/biovers/Data/Filter.vue';

export default {
  components: {
    Map,
    BioversSelection,
    GeoJsonImporter,
    Filter,
    BioversItem,
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
    this.resetBiovers();
    this.getBiovers();
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

img {
  padding-right: 1rem;
}

.link {
  padding-bottom: 1rem;
}

.return {
  display: flex;
}

.text {
  margin: 0;
}

a {
  color: black;
  text-decoration: none;
}
</style>
