<template>
  <el-dialog v-model="dialogVisible" :title="$t('poi.configurator.page_edition')"
  @close="$emit('closeDialog')">
    <el-form :model="form">
      <el-form-item :label="$t('poi.configurator.title')" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.title_is_visible')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.title_is_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.title_is_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.subtitle')" :label-width="formLabelWidth">
        <el-input v-model="form.subtitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.subtitle_is_visible')"
      :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.subtitle_is_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.subtitle_is_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.long')" :label-width="formLabelWidth">
        <el-input v-model="form.coordinate.long" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.lat')" :label-width="formLabelWidth">
        <el-input v-model="form.coordinate.lat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.radius')" :label-width="formLabelWidth">
        <el-input-number v-model="form.radius" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.style_type')" :label-width="formLabelWidth">
        <el-select v-model="form.style_type" class="m-2">
          <el-option
            v-for="item in style_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.style_stroke')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_stroke" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.style_stroke" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item v-if="form.style_stroke" :label="$t('poi.configurator.style_stroke_width')"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_stroke_width" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.style_fill')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_fill" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.style_fill" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.elevation')"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_elevation" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.elevation_ground')"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_elevation_ground" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.noise')"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_noise" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.style_is_visible')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_is_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.style_is_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.visible_from')"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.visible_from" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.trigger')" :label-width="formLabelWidth">
        <el-select v-model="form.trigger_mode" class="m-2">
          <el-option
            v-for="item in trigger_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Elevation du symbole"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.symbol.elevation_ground" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item label="is_facing_user" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.symbol.is_facing_user" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.symbol.is_facing_user" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="is_visible" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.symbol.is_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.symbol.is_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Hauteur du symbole"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.symbol.height" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item label="Largeur du symbole"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.symbol.width" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item label="Symbol pour l'AR" :label-width="formLabelWidth">
        <input
        ref="file"
        type="file"
        name="file"
        accept=".png, .jpg, .svg, .gltf, .glb, .mp3, .m4a, .wav"
        @change="handleFileUpload"/>
      </el-form-item>
      <Renderer v-if="arFile" ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }"
       >
        <Camera :position="{ x: 3, y: 1, z: 3 }" />
        <Scene>
          <AmbientLight></AmbientLight>
          <GltfModel :src="arFile" ref="gltf"/>
        </Scene>
      </Renderer>
      <div id="ar-image" v-if="arImage" :style="{ 'background-image': `url(${arImage})` }" />
      <audio controls v-if="arSound" ref="audio">
        <source :src="arSound">
      </audio>
      <el-form-item label="Symbol pour la carte" :label-width="formLabelWidth">
        <input ref="symbol" type="file" name="file" accept=".png, .svg, .jpg"
        @change="handleFileUploadSymbol"/>
      </el-form-item>
      <div id="ar-image" v-if="symbolImage" :style="{ 'background-image': `url(${symbolImage})`}"/>
      <el-form-item label="Titre du media" :label-width="formLabelWidth">
        <el-input v-model="form.media[0].caption" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('poi.configurator.title_is_visible')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.media[0].caption_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.media[0].caption_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Elevation du media"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.media[0].elevation_ground" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item label="is_facing_user" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.media[0].is_facing_user" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.media[0].is_facing_user" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="is_visible" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.media[0].is_visible" :label="true" size="large">
            {{ $t('poi.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.media[0].is_visible" :label="false" size="large">
            {{ $t('poi.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Media" :label-width="formLabelWidth">
        <input
        ref="media"
        type="file"
        name="media"
        accept=".png, .jpg, .svg, .gltf, .glb, .mp3, .m4a, .wav"
        @change="handleFileMediaUpload"/>
      </el-form-item>
      <Renderer v-if="mediaFile" ref="media-renderer"
      antialias :orbit-ctrl="{ enableDamping: true }"
       >
        <Camera :position="{ x: 3, y: 1, z: 3 }" />
        <Scene>
          <AmbientLight></AmbientLight>
          <GltfModel :src="mediaFile" ref="gltf"/>
        </Scene>
      </Renderer>
      <div id="ar-image" v-if="mediaImage"
      :style="{ 'background-image': `url(${mediaImage})` }" />
      <audio controls v-if="mediaSound" ref="media-audio">
        <source :src="mediaSound">
      </audio>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog', original)">
          {{ $t('poi.configurator.cancel') }}
        </el-button>
        <el-button type="primary" @click="save">
          {{ $t('poi.configurator.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';

import {
  AmbientLight,
  Camera,
  GltfModel,
  Renderer,
  Scene,
} from 'troisjs';

import { updatePoi, getSymbolUrl, getIcon, saveSymbol, getMediaUrl, saveMedia } from '../../../../utils/api.js';

export default {
  emits: ['closeDialog'],
  props: {
    poi: Object,
    showDialog: Boolean,
  },
  components: {
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
  },
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '160px',
      style_option: [{
        value: 'sphere',
        label: this.$i18n.t('poi.configurator.action.sphere'),
      },
      {
        value: 'circle',
        label: this.$i18n.t('poi.configurator.action.circle'),
      }],
      trigger_option: [{
        value: 'location',
        label: this.$i18n.t('poi.configurator.action.location'),
      },
      {
        value: 'touch',
        label: this.$i18n.t('poi.configurator.action.touch'),
      }],
      original: {},
      form: {},
      upload: null,
      uploadSymbol: null,
      symbolFile: null,
      symbolImage: null,
      arSymbol: null,
      arFile: null,
      arImage: null,
      arSound: null,
      uploadMedia: null,
      mediaInput: null,
      mediaFile: null,
      mediaImage: null,
      mediaSound: null,
    };
  },
  methods: {
    handleFileUploadSymbol(event) {
      const files = event.target.files;
      if (files) {
        this.symbolFile = files[0];
        const lastDot = this.symbolFile.name.lastIndexOf('.');
        const ext = this.symbolFile.name.substring(lastDot + 1);
        this.symbolImage = URL.createObjectURL(this.symbolFile);
        this.form.symbol.media_type = ext;
      }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files) {
        this.arSymbol = files[0];
        const lastDot = this.arSymbol.name.lastIndexOf('.');
        const ext = this.arSymbol.name.substring(lastDot + 1);
        if (ext === 'gltf' || ext === 'glb') {
          this.arFile = null;
          this.arImage = null;
          this.arSound = null;
          this.$nextTick(() => {
            this.arFile = URL.createObjectURL(this.arSymbol);
          });
        } else if (ext === 'mp3' || ext === 'm4a' || ext === 'wav') {
          this.arFile = null;
          this.arImage = null;
          this.arSound = null;
          this.$nextTick(() => {
            this.arSound = URL.createObjectURL(this.arSymbol);
          });
        } else {
          this.arFile = null;
          this.arSound = null;
          this.arImage = URL.createObjectURL(this.arSymbol);
        }
        this.form.symbol.media_type_ar = ext;
      }
    },
    handleFileMediaUpload(event) {
      const files = event.target.files;
      if (files) {
        this.mediaInput = files[0];
        const lastDot = this.mediaInput.name.lastIndexOf('.');
        const ext = this.mediaInput.name.substring(lastDot + 1);
        if (ext === 'gltf' || ext === 'glb') {
          this.mediaFile = null;
          this.mediaImage = null;
          this.mediaSound = null;
          this.$nextTick(() => {
            this.mediaFile = URL.createObjectURL(this.mediaInput);
          });
        } else if (ext === 'mp3' || ext === 'm4a' || ext === 'wav') {
          this.mediaFile = null;
          this.mediaImage = null;
          this.mediaSound = null;
          this.$nextTick(() => {
            this.mediaSound = URL.createObjectURL(this.mediaInput);
          });
        } else {
          this.mediaFile = null;
          this.mediaSound = null;
          this.mediaImage = URL.createObjectURL(this.mediaInput);
        }
        this.form.media[0].media_type = ext;
      }
    },
    async save() {
      if (this.arSymbol) {
        const formData = new FormData();
        formData.append('file', this.arSymbol);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.symbol.ar_url = path.data;
        }
      }
      if (this.symbolFile) {
        const formData = new FormData();
        formData.append('file', this.symbolFile);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.symbol.url = path.data;
        }
      }
      if (this.mediaInput) {
        const formData = new FormData();
        formData.append('file', this.mediaInput);
        const path = await saveMedia(formData);
        if (path.data) {
          this.form.media[0].url = path.data;
        }
      }
      const updatedPoi = await updatePoi(this.form);
      this.updatePoi(updatedPoi.data);
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['updatePoi']),
  },
  mounted() {
    this.upload = this.$refs.upload;
    this.uploadSymbol = this.$refs.symbol;
    this.uploadMedia = this.$refs.media;
    this.form = JSON.parse(JSON.stringify(this.poi.poi));
    if (this.form.media.length === 0) {
      this.form.media.push({
        media_type: '',
        url: '',
        elevation_ground: 0,
        is_facing_user: false,
        is_visible: true,
        caption: 'Test',
        caption_visible: true,
      });
    }
    const symbolExtension = this.form.symbol.media_type_ar;
    if (symbolExtension && this.form.symbol) {
      const path = getSymbolUrl(this.form.symbol.id);
      if (symbolExtension === 'gltf' || symbolExtension === 'glb') {
        this.arFile = path;
      } else if (symbolExtension === 'mp3' || symbolExtension === 'm4a' || symbolExtension === 'wav') {
        this.arSound = path;
      } else {
        this.arImage = path;
      }
    }
    if (this.form.symbol.media_type) {
      this.symbolImage = getIcon(this.form.symbol);
    }
    if (this.form.media.url !== '') {
      const mediaExtension = this.form.media[0].media_type;
      const path = getMediaUrl(this.form.media[0]);
      if (mediaExtension === 'gltf' || mediaExtension === 'glb') {
        this.mediaFile = path;
      } else if (mediaExtension === 'mp3' || mediaExtension === 'm4a' || mediaExtension === 'wav') {
        this.mediaSound = path;
      } else {
        this.mediaImage = path;
      }
    }
    this.dialogVisible = this.showDialog;
  },
};
</script>

<style scoped>
#ar-image {
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
}
</style>
