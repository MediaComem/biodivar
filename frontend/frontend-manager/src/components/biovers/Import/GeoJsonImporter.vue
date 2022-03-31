<template>
  <el-upload
    ref="upload"
    class="upload-demo"
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

import api from '../../../api/poi';

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
    sent() {
      let fileContent = '';

      const fr = new FileReader();
      fr.onload = () => {
        fileContent = fr.result;
        const result = JSON.parse(fileContent);
        if (Array.isArray(result)) {
          result.forEach((type) => {
            type.features.forEach((data) => {
              if (data.geometry.type === 'Point') {
                this.pois.push(this.createPoi(data));
              }
            });
          });
          this.importPois(this.pois);
        } else {
          result.features.forEach((data) => {
            if (data.geometry.type === 'Point') {
              this.pois.push(this.createPoi(data));
            }
          });
          this.upload.uploadFiles.splice(0, 1);
          this.importPois(this.pois);
        }
      };
      fr.readAsText(this.upload.uploadFiles[0].raw);
    },
    async save() {
      await api.savePois(this.pois);
      this.resetUpload();
      this.saveDone = true;
      setTimeout(() => {
        this.saveDone = false;
      }, 2000);
    },
    ...mapActions('biovers', ['importPois', 'resetUpload']),
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
