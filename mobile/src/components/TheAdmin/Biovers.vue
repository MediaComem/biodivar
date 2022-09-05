<template>
  <div>
    <div style="height: 50vh">
      <Map />
    </div>
    <div class="upload-layout">
      <div class="import">
        <GeoJsonImporter
          v-if="bioversToDisplay.length > 0 && ownBiovers.length > 0"
          :authorId="ownBiovers[0].owner"
        />
      </div>
      <div class="filter">
        <Filter v-if="bioversToDisplay.length > 0" />
      </div>
    </div>
    <div>
      <BioversSelection />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import Map from './biovers/Map/Map.vue';
import BioversSelection from './biovers/Data/BioversSelection.vue';
import GeoJsonImporter from './biovers/Import/GeoJsonImporter.vue';
import Filter from './biovers/Data/Filter.vue';

export default {
  components: {
    Map,
    BioversSelection,
    GeoJsonImporter,
    Filter,
  },
  methods: {
    ...mapActions('biovers', ['getBiovers']),
  },
  computed: {
    ...mapState('biovers', ['ownBiovers', 'bioversToDisplay', 'currentBioversId']),
  },
  async mounted() {
    this.getBiovers();
  },
};
</script>

<style scoped>
.upload-layout {
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.import {
  grid-area: 1 / 1 / 2 / 2;
}

.filter {
  grid-area: 1 / 2 / 2 / 3;
}</style>
