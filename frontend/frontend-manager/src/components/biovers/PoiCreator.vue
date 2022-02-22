<template>
  <el-dialog v-model="dialogVisible" title="Création d'un POI">
    <el-form :model="form">
      <el-form-item label="Longitude" :label-width="formLabelWidth">
        <el-input v-model="form.lng" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Latitude" :label-width="formLabelWidth">
        <el-input v-model="form.lat" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="$emit('save', form)"
          >Confirm</el-button
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
      this.form.lat = newVal.lat;
      this.form.lng = newVal.lng;
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
      form: {
        lat: undefined,
        lng: undefined,
      },
    };
  },
};
</script>
