<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map v-if="getOwnerBiovers" :biovers="biovers"
      :pois="pois" :paths="paths" @new-poi="addPoiToCurrentList"
      @update-poi="updatePoi"/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <BioversSelection v-if="getOwnerBiovers"
      :ownerBiovers="getOwnerBiovers"
      :bioversToDisplay="bioversToDisplay"
      @selected-biovers="selectedBiovers"
      @poi-to-display="poiToDisplay"
      @path-to-display="pathToDisplay"
      @update-poi="updatePoi"/>
    </el-col>
  </el-row>
</template>
<script>
import Map from '../components/biovers/Map.vue';
import BioversSelection from '../components/biovers/BioversSelection.vue';

import getData from '../api/biovers';

export default {
  components: {
    Map,
    BioversSelection,
  },
  data() {
    return {
      biovers: [],
      ownerBiovers: {},
      publicBiovers: {},
      pois: [],
      paths: [],
      bioversToDisplay: [],
    };
  },
  methods: {
    selectedBiovers(event) {
      const selectBiover = this.getOwnerBiovers.find((e) => e.name === event.biover.label);
      this.bioversToDisplay.push({
        title: selectBiover.name,
        name: `${event.index}`,
        biover: selectBiover,
      });
    },
    poiToDisplay(event) {
      const index = this.pois.findIndex((e) => e.biover === event.biover);
      const p = [];
      event.pois.forEach((element) => {
        const c = [element.element.coordinate.lat, element.element.coordinate.long];
        p.push({ element: element.element, coordinate: c });
      });
      if (index !== -1) {
        this.pois[index].pois = p;
      } else {
        this.pois.push({ biover: event.biover, pois: p });
      }
    },
    pathToDisplay(event) {
      const index = this.paths.findIndex((e) => e.biover === event.biover);
      const p = [];
      event.paths.forEach((element) => {
        const coordinates = [];
        element.element.coordinate.forEach((x) => {
          coordinates.push([x.lat, x.long]);
        });
        p.push({ element: element.element, coordinate: coordinates });
      });
      if (index !== -1) {
        this.paths[index].paths = p;
      } else {
        this.paths.push({ biover: event.biover, paths: p });
      }
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
    updatePoi(event) {
      const bioverIndex = this.pois.findIndex((poi) => poi.biover === event.biover);
      const poiIndex = this.pois[bioverIndex].pois.findIndex((e) => e.element.id === event.poi.id);
      this.pois[bioverIndex].pois[poiIndex].element = event.poi;
      this.pois[bioverIndex].pois[poiIndex].coordinate = [event.poi.coordinate.lat,
        event.poi.coordinate.long];
      this.bioversToDisplay.forEach((biover) => {
        const index = biover.biover.Poi.findIndex((poi) => poi.id === event.poi.id);
        if (index !== -1) {
          // eslint-disable-next-line no-param-reassign
          biover.biover.Poi[index] = event.poi;
        }
      });
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
