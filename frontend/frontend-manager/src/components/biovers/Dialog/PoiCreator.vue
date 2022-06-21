<template>
  <el-dialog v-model="dialogVisible" :title="$t('poi.configurator.page_creation')"
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
      <el-form-item label="Hauteur du symbole"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.symbol.height" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item label="Largeur du symbole"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.symbol.width" :precision="2" :step="1"/>
      </el-form-item>
      <el-form-item>
        <input ref="file" type="file" name="file" accept=".png, .svg, .gltf, .glb, .mp3, .m4a, .wav"
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
      <el-form-item>
        <input ref="symbol" type="file" name="file" accept=".png, .svg"
        @change="handleFileUploadSymbol"/>
      </el-form-item>
      <div id="ar-image" v-if="symbolImage" :style="{ 'background-image': `url(${symbolImage})`}"/>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">
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
import { mapActions, mapState } from 'vuex';

import {
  AmbientLight,
  Camera,
  GltfModel,
  Renderer,
  Scene,
} from 'troisjs';

import poi from '../../../api/poi';
import symbol from '../../../api/symbol';

export default {
  emits: ['closeDialog'],
  components: {
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
  },
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
    },
    coordinate(newVal) {
      this.form.coordinate.lat = newVal.lat;
      this.form.coordinate.long = newVal.lng;
    },
  },
  props: {
    coordinate: Object,
    showDialog: Boolean,
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
      form: {
        title: '',
        title_is_visible: true,
        subtitle: '',
        subtitle_is_visible: false,
        coordinate: {
          lat: undefined,
          long: undefined,
          alt: 550,
        },
        radius: 2,
        style_type: 'Sphere',
        style_stroke: false,
        style_stroke_width: 1.5,
        style_fill: false,
        style_elevation: 15.5,
        style_elevation_ground: 33.3,
        style_noise: 15.2,
        style_is_visible: true,
        visible_from: 455.3,
        trigger_mode: 'location',
        symbol: {
          media_type: '',
          url: '',
          ar_url: '',
          media_type_ar: '',
          elevation_ground: 0,
          is_facing_user: false,
          is_visible: false,
          width: 50,
          height: 40,
        },
      },
      upload: null,
      uploadSymbol: null,
      symbolFile: null,
      symbolImage: null,
      arSymbol: null,
      arFile: null,
      arImage: null,
      arSound: null,
    };
  },
  computed: {
    ...mapState('biovers', ['currentBioversId']),
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
    async save() {
      if (this.arSymbol) {
        const formData = new FormData();
        formData.append('file', this.arSymbol);
        const path = await symbol.save(formData);
        if (path.data.data) {
          this.form.symbol.ar_url = path.data.data;
        }
      }
      if (this.symbolFile) {
        const formData = new FormData();
        formData.append('file', this.symbolFile);
        const path = await symbol.save(formData);
        if (path.data.data) {
          this.form.symbol.url = path.data.data;
        }
      }
      this.form.biovers = this.currentBioversId;
      const newPoi = await poi.savePoi(this.form);
      this.addNewPoi(newPoi.data.data);
      this.showCreationDialog = false;
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewPoi']),
  },
  mounted() {
    this.upload = this.$refs.upload;
    this.uploadSymbol = this.$refs.symbol;
  },
};
</script>
