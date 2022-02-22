<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map v-if="getOwnerBiovers" :biovers="biovers"
      :pois="pois" :paths="paths" @new-poi="addPoiToCurrentList"/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col v-if="biovers.length === 0" :span="24">
      <BioversSelection v-if="getOwnerBiovers" :ownerBiovers="getOwnerBiovers"
      @selected-biovers="selectedBiovers"/>
    </el-col>
    <el-col v-if="biovers.length > 0" :span="24">
      <BioversTab :ownerBiovers="biovers"
      @poi-to-display="poiToDisplay" @path-to-display="pathToDisplay"/>
    </el-col>
  </el-row>
</template>
<script>
import Map from '../components/biovers/Map.vue';
import BioversTab from '../components/biovers/BioversTab.vue';
import BioversSelection from '../components/biovers/BioversSelection.vue';

import getData from '../api/biovers';

export default {
  components: {
    Map,
    BioversTab,
    BioversSelection,
  },
  data() {
    return {
      biovers: [],
      ownerBiovers: {},
      publicBiovers: {},
      pois: [],
      paths: [],
    };
  },
  methods: {
    selectedBiovers(event) {
      this.biovers.push(event);
    },
    poiToDisplay(event) {
      const pois = [];
      event.forEach((element) => {
        const c = [element.element.coordinate.lat, element.element.coordinate.long];
        pois.push({ element: element.element, coordinate: c });
      });
      this.pois = pois;
    },
    pathToDisplay(event) {
      const path = [];
      event.forEach((element) => {
        const coordinates = [];
        element.element.coordinate.forEach((x) => {
          coordinates.push([x.lat, x.long]);
        });
        path.push({ element: element.element, coordinate: coordinates });
      });
      this.paths = path;
    },
    async getPublic() {
      const result = await getData.getPublicBiovers();
      this.publicBiovers = result.data;
    },
    async getOwner() {
      const result = await getData.getBioversByUser(4);
      this.ownerBiovers = result.data;
    },
    async addPoiToCurrentList(event) {
      const biover = this.ownerBiovers.data.find((e) => e.id === event.biovers);
      biover.Poi.push(event);
    },
  },
  computed: {
    getPublicBiovers() {
      return this.publicBiovers.data;
    },
    getOwnerBiovers() {
      return this.ownerBiovers.data;
    },
  },
  async mounted() {
    await this.getOwner();
    await this.getPublic();
  },
};
</script>

<style scoped></style>
