<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map />
    </el-col>
  </el-row>
  <el-row
    :gutter="20"
    v-if="currentBioversId !== 0"
    style="margin-top: 2vh; margin-bottom: 2vh; margin-left: 0px;"
  >
    <GeoJsonImporter
      v-if="bioversToDisplay.length > 0 && ownBiovers.length > 0"
      :authorId="ownBiovers[0].owner"
    />
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <BioversSelection />
    </el-col>
  </el-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import Map from '../components/biovers/Map/Map.vue';
import BioversSelection from '../components/biovers/Data/BioversSelection.vue';
import GeoJsonImporter from '../components/biovers/Import/GeoJsonImporter.vue';

export default {
  components: {
    Map,
    BioversSelection,
    GeoJsonImporter,
  },
  methods: {
    ...mapActions('biovers', ['getBiovers']),
  },
  computed: {
    ...mapState('biovers', ['ownBiovers', 'bioversToDisplay', 'currentBioversId']),
  },
  async activated() {
    this.getBiovers();
  },
};
</script>

<style scoped></style>
