<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  nextTick,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

import {
  AmbientLight,
  Camera,
  GltfModel,
  Renderer,
  Scene,
} from 'troisjs';

import poi from '../../../api/poi';
import symbolUtils from '../../../api/symbol';
import mediaUtils from '../../../api/media';

const emit = defineEmits(['closeDialog']);

const props = defineProps({
  poi: Object,
  showDialog: Boolean,
});

const { t } = useI18n();

const store = useStore();

const dialogVisible = ref(false);
const formLabelWidth = ref('160px');
const styleOption = ref([{
  value: 'sphere',
  label: t('poi.configurator.action.sphere'),
},
{
  value: 'circle',
  label: t('poi.configurator.action.circle'),
}]);
const triggerOption = ref([{
  value: 'location',
  label: t('poi.configurator.action.location'),
},
{
  value: 'touch',
  label: t('poi.configurator.action.touch'),
}]);
const original = ref({});
const form = ref({});
const upload = ref(null);
const symbol = ref(null);
const symbolFile = ref(null);
const symbolImage = ref(null);
const arSymbol = ref(null);
const arFile = ref(null);
const arImage = ref(null);
const arSound = ref(null);
const media = ref(null);
const mediaInput = ref(null);
const mediaFile = ref(null);
const mediaImage = ref(null);
const mediaSound = ref(null);

function updatePoi(updatedPoi) {
  store.dispatch('biovers/updatePoi', updatedPoi);
}

function handleFileUploadSymbol(event) {
  const files = event.target.files;
  if (files) {
    symbolFile.value = files[0];
    const lastDot = symbolFile.value.name.lastIndexOf('.');
    const ext = symbolFile.value.name.substring(lastDot + 1);
    symbolImage.value = URL.createObjectURL(symbolFile.value);
    form.value.symbol.media_type = ext;
  }
}

function handleFileUpload(event) {
  const files = event.target.files;
  if (files) {
    arSymbol.value = files[0];
    const lastDot = arSymbol.value.name.lastIndexOf('.');
    const ext = arSymbol.value.name.substring(lastDot + 1);
    if (ext === 'gltf' || ext === 'glb') {
      arFile.value = null;
      arImage.value = null;
      arSound.value = null;
      nextTick(() => {
        arFile.value = URL.createObjectURL(arSymbol.value);
      });
    } else if (ext === 'mp3' || ext === 'm4a' || ext === 'wav') {
      arFile.value = null;
      arImage.value = null;
      arSound.value = null;
      nextTick(() => {
        arSound.value = URL.createObjectURL(arSymbol.value);
      });
    } else {
      arFile.value = null;
      arSound.value = null;
      arImage.value = URL.createObjectURL(arSymbol.value);
    }
    form.value.symbol.media_type_ar = ext;
  }
}

function handleFileMediaUpload(event) {
  const files = event.target.files;
  if (files) {
    mediaInput.value = files[0];
    const lastDot = mediaInput.value.name.lastIndexOf('.');
    const ext = mediaInput.value.name.substring(lastDot + 1);
    if (ext === 'gltf' || ext === 'glb') {
      mediaFile.value = null;
      mediaImage.value = null;
      mediaSound.value = null;
      nextTick(() => {
        mediaFile.value = URL.createObjectURL(mediaInput.value);
      });
    } else if (ext === 'mp3' || ext === 'm4a' || ext === 'wav') {
      mediaFile.value = null;
      mediaImage.value = null;
      mediaSound.value = null;
      nextTick(() => {
        mediaSound.value = URL.createObjectURL(mediaInput.value);
      });
    } else {
      mediaFile.value = null;
      mediaSound.value = null;
      mediaImage.value = URL.createObjectURL(mediaInput.value);
    }
    form.value.media[0].media_type = ext;
  }
}

async function save() {
  if (arSymbol.value) {
    const formData = new FormData();
    formData.append('file', arSymbol.value);
    const path = await symbolUtils.save(formData);
    if (path.data.data) {
      form.value.symbol.ar_url = path.data.data;
    }
  }
  if (symbolFile.value) {
    const formData = new FormData();
    formData.append('file', symbolFile.value);
    const path = await symbolUtils.save(formData);
    if (path.data.data) {
      form.value.symbol.url = path.data.data;
    }
  }
  if (mediaInput.value) {
    const formData = new FormData();
    formData.append('file', mediaInput.value);
    const path = await mediaUtils.save(formData);
    if (path.data.data) {
      form.value.media[0].url = path.data.data;
    }
  }
  const updatedPoi = await poi.updatePoi(form.value);
  updatePoi(updatedPoi.data.data);
  emit('closeDialog');
}

onMounted(() => {
  form.value = JSON.parse(JSON.stringify(props.poi.poi));
  if (form.value.media.length === 0) {
    form.value.media.push({
      media_type: '',
      url: '',
      elevation_ground: 0,
      is_facing_user: false,
      is_visible: true,
      caption: 'Test',
      caption_visible: true,
    });
  }
  const symbolExtension = form.value.symbol.media_type_ar;
  if (symbolExtension) {
    const path = symbolUtils.getSymbolAr(form.value.symbol);
    if (symbolExtension === 'gltf' || symbolExtension === 'glb') {
      arFile.value = path;
    } else if (symbolExtension === 'mp3' || symbolExtension === 'm4a' || symbolExtension === 'wav') {
      arSound.value = path;
    } else {
      arImage.value = path;
    }
  }
  if (form.value.symbol.media_type) {
    symbolImage.value = symbolUtils.getSymbol(form.value.symbol);
  }
  if (form.value.media.url !== '') {
    const mediaExtension = form.value.media[0].media_type;
    const path = mediaUtils.getMedia(form.value.media[0]);
    if (mediaExtension === 'gltf' || mediaExtension === 'glb') {
      mediaFile.value = path;
    } else if (mediaExtension === 'mp3' || mediaExtension === 'm4a' || mediaExtension === 'wav') {
      mediaSound.value = path;
    } else {
      mediaImage.value = path;
    }
  }
  dialogVisible.value = props.showDialog;
});
</script>

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
            v-for="item in styleOption"
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
            v-for="item in triggerOption"
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
