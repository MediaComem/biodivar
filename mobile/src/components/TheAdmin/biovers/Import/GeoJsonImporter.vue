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
      {{ $t('import.select') }}
      </el-button>
    </template>
    <el-button
      class="ml-3"
      type="primary"
      @click="sent"
      :disabled="upload && upload.uploadFiles && upload.uploadFiles.length === 0"
    >
    {{ $t('import.upload') }}
    </el-button>
    <el-button
      class="ml-3"
      type="success"
      @click="save"
      :disabled="!uploadDone"
    >
    {{ $t('import.save') }}
    </el-button>
  </el-upload>
  <template v-if="saveDone">
    <el-alert :title="$t('import.result')" type="success" />
  </template>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { savePois, savePaths } from '../../../../utils/api.js';


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
      console.log(this.upload);
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
        coordinate: {
          long: poi.geometry.coordinates[0],
          lat: poi.geometry.coordinates[1],
          alt: poi.geometry.coordinates[2],
          creation_date: new Date(),
        },
        position: {
          x: 0,
          alpha: 0,
          y: 0,
        },
        biovers: this.currentBioversId,
        extrusion: 0,
        radius: 0,
        style_type: 'circle',
        style_stroke_width: 1,
        stroke_color: '#FFFFFF',
        stroke_opacity: 100,
        fill_type: false,
        fill_color: '#FFFFFF',
        fill_opacity: 100,
        amplitude: 22.3,
        wireframe: false,
        scope: 50,
        trigger_mode: 'location',
      };
    },
    createPathCoordinates(coordiantes) {
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
        coordinate: this.createPathCoordinates(coordinates),
        biovers: this.currentBioversId,
        radius: 15.5,
        style_type: 'sphere',
        style_stroke: true,
        style_stroke_width: 1.2,
        style_elevation: 16.4,
        amplitude: 22.3,
        style_is_visible: true,
        scope: 455.5,
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
        const createdPois = await savePois(this.pois);
        this.updateImportPois(createdPois.data);
      }

      if (this.paths.length > 0) {
        const createdPaths = await savePaths(this.paths);
        this.updateImportPaths(createdPaths.data);
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
