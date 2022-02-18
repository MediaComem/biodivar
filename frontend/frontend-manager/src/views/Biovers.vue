<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map v-if="ownerBiovers.data" :biovers="ownerBiovers.data[0]"
      :pois="pois" :paths="paths"/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <BioversTab v-if="ownerBiovers.data" :ownerBiovers="getOwnerBiovers"
      @poi-to-display="poiToDisplay" @path-to-display="pathToDisplay"/>
    </el-col>
  </el-row>
</template>
<script>
import Map from '../components/biovers/Map.vue';
import BioversTab from '../components/biovers/BioversTab.vue';

import getData from '../api/biovers';

export default {
  components: {
    Map,
    BioversTab,
  },
  data() {
    return {
      ownerBiovers: {},
      publicBiovers: {},
      pois: [],
      paths: [],
    };
  },
  methods: {
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
