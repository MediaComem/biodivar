<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    style="display: flex;"
    accept=".json,.geojson"
    action="https://jsonplaceholder.typicode.com/posts/"
    :auto-upload="false"
    :on-change="handleExceed"
  >
    <template #trigger>
      <el-button
        class="ml-3"
        type="info"
      >
      select file
      </el-button>
    </template>
    <el-button
      class="ml-3"
      type="primary"
      @click="sent"
      :disabled="upload && upload.uploadFiles.length === 0"
    >
    upload to view
    </el-button>
    <el-button
      class="ml-3"
      type="success"
      @click="save"
      :disabled="!uploadDone"
    >
    Save to server
    </el-button>
  </el-upload>
  <template v-if="saveDone">
    <el-alert title="Data save" type="success" />
  </template>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import poiAPI from '../../../api/poi';
import pathAPI from '../../../api/path';

export default {
  name: 'GeoJsonImporter',
  props: {
    authorId: Number,
  },
  data() {
    return {
      upload: null,
      saveDone: false,
      pois: [],
      paths: [],
    };
  },
  computed: {
    ...mapState('biovers', ['currentBioversId', 'uploadInProgress', 'uploadDone']),
  },
  methods: {
    handleExceed() {
      if (this.upload.uploadFiles.length > 1) {
        this.upload.uploadFiles.splice(0, 1);
      }
    },
    createElement(data) {
      if (data.geometry.type === 'Point') {
        this.pois.push(this.createPoi(data));
      } else if (data.geometry.type === 'LineString') {
        this.paths.push(this.createPath(data.geometry.coordinates));
      }
    },
    createPoi(poi) {
      return {
        title: poi.properties.common_name.fr,
        title_is_visible: true,
        subtitle: '',
        subtitle_is_visible: false,
        author: this.authorId,
        is_public: false,
        is_editable: false,
        coordinate: {
          long: poi.geometry.coordinates[0],
          lat: poi.geometry.coordinates[1],
          alt: poi.geometry.coordinates[2],
        },
        biovers: this.currentBioversId,
        radius: 15.5,
        style_type: 'sphere',
        style_stroke: true,
        style_stroke_width: 1.2,
        style_fill: false,
        style_elevation: 16.4,
        style_elevation_ground: 32.4,
        style_noise: 22.3,
        style_is_visible: true,
        visible_from: 455.5,
        trigger_mode: 'location',
      };
    },
    createPathCoordinates(coordiantes) {
      console.log(coordiantes);
      const pathCoordiantes = [];
      coordiantes.forEach((coordiante) => pathCoordiantes.push({
        long: coordiante[0],
        lat: coordiante[1],
        alt: coordiante[2] || 0,
      }));
      return pathCoordiantes;
    },
    createPath(coordinates) {
      return {
        author: this.authorId,
        is_public: false,
        is_editable: false,
        coordinate: this.createPathCoordinates(coordinates),
        biovers: this.currentBioversId,
        radius: 15.5,
        style_type: 'sphere',
        style_stroke: true,
        style_stroke_width: 1.2,
        style_elevation: 16.4,
        style_elevation_ground: 32.4,
        style_noise: 22.3,
        style_is_visible: true,
        visible_from: 455.5,
      };
    },
    sent() {
      let fileContent = '';

      const fr = new FileReader();
      fr.onload = () => {
        fileContent = fr.result;
        const result = JSON.parse(fileContent);
        if (Array.isArray(result)) {
          result.forEach((type) => {
            type.features.forEach((data) => {
              this.createElement(data);
            });
          });
        } else {
          result.features.forEach((data) => {
            this.createElement(data);
          });
        }
        this.importPois(this.pois);
        this.importPaths(this.paths);
      };
      fr.readAsText(this.upload.uploadFiles[0].raw);
    },
    async save() {
      if (this.pois.length > 0) {
        const createdPois = await poiAPI.savePois(this.pois);
        this.updateImportPois(createdPois.data.data);
      }

      if (this.paths.length > 0) {
        const createdPaths = await pathAPI.savePaths(this.paths);
        this.updateImportPaths(createdPaths.data.data);
      }

      this.resetUpload();
      this.upload.uploadFiles.splice(0, 1);
      this.saveDone = true;
      setTimeout(() => {
        this.saveDone = false;
      }, 2000);
    },
    ...mapActions('biovers', ['importPois', 'importPaths', 'resetUpload', 'updateImportPois', 'updateImportPaths']),
  },
  mounted() {
    this.upload = this.$refs.upload;
  },
};
</script>

<style>
.el-upload {
  padding-right: 15px;
}
</style>
