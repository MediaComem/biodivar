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

import poi from '../../../api/poi';

export default {
  emits: ['closeDialog'],
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
      },
    };
  },
  computed: {
    ...mapState('biovers', ['currentBioversId']),
  },
  methods: {
    async save() {
      this.form.biovers = this.currentBioversId;
      const newPoi = await poi.savePoi(this.form);
      this.addNewPoi(newPoi.data.data);
      this.showCreationDialog = false;
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewPoi']),
  },
};
</script>
