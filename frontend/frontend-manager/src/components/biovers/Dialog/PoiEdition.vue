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
import poi from '../../../api/poi';

export default {
  emits: ['closeDialog'],
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
    },
    poi(newVal) {
      this.form = JSON.parse(JSON.stringify(newVal.poi));
    },
  },
  props: {
    poi: Object,
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
      original: {},
      form: {},
    };
  },
  methods: {
    async save() {
      const updatedPoi = await poi.updatePoi(this.form);
      this.updatePoi(updatedPoi.data.data);
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['updatePoi']),
  },
};
</script>
