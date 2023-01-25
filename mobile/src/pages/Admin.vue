<template>
  <div>
    <div style="display: flex">
      <p class="material-symbols-sharp font-symbol">push_pin</p>
      <p v-if="pins.length > 0" class="font-pin" style="text-align: start">biovers épinglé·s&thinsp;:</p>
    </div>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover"/>
    </div>
    <div class="return"><a class="link" href="#menu"><p class="material-symbols-sharp icon-font icon-margin">arrow_back</p></a><p class="text font">CARTE</p></div>
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

.font-symbol {
    font-variation-settings: "FILL" 1;
    font-size: 16px;
    line-height: 12px;
    letter-spacing: 0.04em;
    padding-right: 4px;
  } 


.font-pin {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 85, "ital" 0;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.04em;
    align-items: center;
    display: flex;
  }

.font {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 110, "ital" 0;
    font-size: 18px;
    line-height: 14px;
    letter-spacing: 0.02em;
  }

.icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }

.link {
  padding-bottom: 1rem;
}

.return {
  display: flex;
      height: 36px;
      margin-top: 0.2rem;
}

.text {
  margin: 0;
  padding-top: 5px;
}

a {
  color: black;
  text-decoration: none;
}
</style>
