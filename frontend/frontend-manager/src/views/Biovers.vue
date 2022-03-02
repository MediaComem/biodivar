<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map :currentBioversId="currentBioversId"
      :pois="pois" :paths="paths" @new-poi="addPoiToCurrentList"
      @update-poi="updatePoi"/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <BioversSelection v-if="ownerBiovers.length > 0"
      :ownerBiovers="ownerBiovers"
      :bioversToDisplay="bioversToDisplay"
      @selected-biovers="selectedBiovers"
      @create-biover="createBiover"
      @remove-biover="removeBiover"
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
      currentBioversId: 0,
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
      this.currentBioversId = event.biover.id;
    },
    createBiover(event) {
      this.ownerBiovers.push(event);
      console.log(this.ownerBiovers);
    },
    removeBiover(bioverId) {
      const index = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === bioverId);
      this.bioversToDisplay.splice(index, 1);
      const poiIndex = this.pois.findIndex((poi) => poi.biover === bioverId);
      this.pois.splice(poiIndex, 1);
      const pathIndex = this.paths.findIndex((path) => path.biover === bioverId);
      this.paths.splice(pathIndex, 1);
    },
    poiToDisplay(event) {
      console.log(event);
      const index = this.pois.findIndex((e) => e.biover === event.biover);
      const p = [];
      event.pois.forEach((element) => {
        const c = [element.element.coordinate.lat, element.element.coordinate.long];
        p.push({ element: element.element, coordinate: c });
      });
      if (index !== -1) {
        console.log(p);
        this.pois[index].pois = p;
      } else {
        console.log(p);
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
      this.ownerBiovers = result.data.data;
    },
    async addPoiToCurrentList(event) {
      const biover = this.ownerBiovers.find((e) => e.id === event.biovers);
      biover.Poi.push(event);
    },
    updatePoi(event) {
      console.log(event);
      console.log(this.pois);
      const bioverIndex = this.pois.findIndex((poi) => poi.biover === event.biover);
      console.log(bioverIndex);
      const poiIndex = this.pois[bioverIndex].pois.findIndex((e) => e.element.id === event.poi.id);
      console.log(poiIndex);
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
      return this.ownerBiovers;
    },
  },
  async mounted() {
    await this.getOwner();
    await this.getPublic();
  },
};
</script>

<style scoped></style>
