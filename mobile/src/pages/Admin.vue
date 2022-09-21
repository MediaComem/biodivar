<template>
  <div>
    <p v-if="pins.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" @map="selectedBiovers"/>
    </div>
    <div class="return"><a class="link" href="#menu"><img src="../assets/shared/arrow_back.svg"/></a><p class="text">CARTE</p></div>
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
    selectedBiovers(event) {
      this.addBioverToDisplay(event);
      this.addPoiToDisplay(event.id);
      this.addPathToDisplay(event.id);
      this.addTraceToDisplay(event.id);
      this.addEventToDisplay(event.id);
    },
    ...mapActions('biovers', ['getBiovers', 'resetBiovers', 'addBioverToDisplay', 'addPoiToDisplay', 'addPathToDisplay', 'addTraceToDisplay', 'addEventToDisplay', 'loadPoiColumns']),
  },
  computed: {
    pins() {
      const { getPinsBiovers } = useStore();
      return getPinsBiovers();
    },
    ...mapState('biovers', ['ownBiovers', 'bioversToDisplay', 'currentBioversId']),
    ...mapGetters('biovers', ['getPoiColumnsPreference']),
  },
  async mounted() {
    this.resetBiovers();
    this.getBiovers();
    if (this.getPoiColumnsPreference === undefined) {
      this.loadPoiColumns();
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
