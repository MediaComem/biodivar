<template>
  <el-row :gutter="20" style="height: 50vh">
    <el-col :span="24">
      <Map :currentBioversId="currentBioversId"
      :pois="pois" :paths="paths" @new-poi="addPoiToCurrentList"
      @update-poi="updatePoi" @add="add"/>
    </el-col>
  </el-row>
  <el-row
    :gutter="20"
    v-if="ownerBiovers && currentBioversId !== 0"
    style="margin-top: 2vh; margin-bottom: 2vh; margin-left: 0px;"
  >
    <GeoJsonImporter v-if="bioversToDisplay.length > 0"
      :authorId="ownerBiovers[0].owner"
      :bioverId="currentBioversId"
      :uploadDone="uploadDone"
      @import-poi="importPoi"
      @save="uploadDone = true"
    />
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <BioversSelection v-if="ownerBiovers.length > 0"
      :ownerBiovers="ownerBiovers"
      :publicBiovers="publicBiovers"
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
import Map from '../components/biovers/Map/Map.vue';
import BioversSelection from '../components/biovers/Data/BioversSelection.vue';
import GeoJsonImporter from '../components/biovers/Import/GeoJsonImporter.vue';

import getData from '../api/biovers';

export default {
  components: {
    Map,
    BioversSelection,
    GeoJsonImporter,
  },
  data() {
    return {
      currentBioversId: 0,
      ownerBiovers: {},
      publicBiovers: {},
      pois: [],
      paths: [],
      bioversToDisplay: [],
      uploadInProgress: false,
      uploadDone: true,
    };
  },
  methods: {
    add() {
      if (this.uploadInProgress) {
        this.uploadDone = false;
        this.uploadInProgress = false;
      }
    },
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
      const index = this.pois.findIndex((e) => e.biover === event.biover);
      const p = [];
      event.pois.forEach((e) => {
        const c = [e.coordinate.lat, e.coordinate.long];
        p.push({ element: e, coordinate: c });
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
    importPoi(pois) {
      this.uploadInProgress = true;
      const currentMapIndex = this.pois.findIndex((e) => e.biover === this.currentBioversId);
      const currentTableIndex = this.bioversToDisplay
        .findIndex((e) => e.biover.id === this.currentBioversId);
      pois.forEach((poi) => {
        this.pois[currentMapIndex].pois.push({
          coordinate: [poi.coordinate.lat, poi.coordinate.long],
          element: poi,
        });
        this.bioversToDisplay[currentTableIndex].biover.Poi.push(poi);
      });
    },
    getPublic() {
      return getData.getPublicBiovers();
    },
    getOwner() {
      return getData.getBioversByUser(4);
    },
    async addPoiToCurrentList(event) {
      const biover = this.ownerBiovers.find((e) => e.id === event.biovers);
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
      return this.publicBiovers;
    },
    getOwnerBiovers() {
      return this.ownerBiovers;
    },
  },
  async mounted() {
    const owners = await this.getOwner();
    const publicB = await this.getPublic();
    const difference = publicB.data.data.filter(
      (x) => !owners.data.data.some((present) => present.id === x.id),
    );
    this.ownerBiovers = owners.data.data;
    this.publicBiovers = difference;
  },
};
</script>

<style scoped></style>
