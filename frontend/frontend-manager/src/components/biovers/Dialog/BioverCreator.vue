<template>
  <el-dialog v-model="dialogVisible" title="Création d'un Biover" @close="$emit('closeDialog')">
    <el-form :model="form">
      <el-form-item label="Nom" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Est public?" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.is_public" :label="true" size="large">Oui</el-radio>
          <el-radio v-model="form.is_public" :label="false" size="large">Non</el-radio>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">Annuler</el-button>
        <el-button type="primary" @click="save">Confirmer</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex';

import getData from '../../../api/biovers';

export default {
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
      this.form.name = '';
    },
  },
  props: {
    showDialog: Boolean,
  },
  emits: ['closeDialog'],
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '140px',
      form: {
        name: '',
        is_public: true,
      },
    };
  },
  methods: {
    async save() {
      const newBiover = await getData.createBiover(this.form);
      this.addNewBiover(newBiover.data.data);
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewBiover']),
  },
};
</script>
