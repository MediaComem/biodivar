<template>
  <el-dialog v-model="dialogVisible" title="Création d'un POI" @close="$emit('closeDialog')">
    <el-form :model="form">
      <el-form-item label="Titre" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Titre est visible" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.title_is_visible" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.title_is_visible" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Sous-titre" :label-width="formLabelWidth">
        <el-input v-model="form.subtitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Sous-titre est visible" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.subtitle_is_visible" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.subtitle_is_visible" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Longitude" :label-width="formLabelWidth">
        <el-input v-model="form.coordinate.long" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Latitude" :label-width="formLabelWidth">
        <el-input v-model="form.coordinate.lat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Radius" :label-width="formLabelWidth">
        <el-input-number v-model="form.radius" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Type de style" :label-width="formLabelWidth">
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
      <el-form-item label="Style Stroke" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_stroke" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.style_stroke" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
      <el-form-item v-if="form.style_stroke" label="Style Stroke Width"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_stroke_width" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Style Fill" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_fill" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.style_fill" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Style Elevation"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_elevation" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Style Elevation Ground"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_elevation_ground" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Style Noise"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.style_noise" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Style Visible" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.style_is_visible" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.style_is_visible" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="Style From"
      :label-width="formLabelWidth">
        <el-input-number v-model="form.visible_from" :precision="2" :step="0.1"/>
      </el-form-item>
      <el-form-item label="Trigger Mode" :label-width="formLabelWidth">
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
        <el-button @click="$emit('closeDialog')">Annuler</el-button>
        <el-button type="primary" @click="$emit('save', form)"
          >Confirmer</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  emits: ['closeDialog', 'save'],
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
      formLabelWidth: '140px',
      style_option: [{
        value: 'sphere',
        label: 'Sphere',
      },
      {
        value: 'circle',
        label: 'Circle',
      }],
      trigger_option: [{
        value: 'location',
        label: 'Location',
      },
      {
        value: 'touch',
        label: 'Touch',
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
};
</script>
