<template>
  <el-dialog v-model="dialogVisible" :title="$t('biover.configurator.title')"
    @close="$emit('closeDialog')">
    <el-form :model="form">
      <el-form-item :label="$t('biover.configurator.name')" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('biover.configurator.public')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.is_public" :label="true" size="large">
            {{ $t('biover.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.is_public" :label="false" size="large">
            {{ $t('biover.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('biover.configurator.editable')" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.is_editable" :label="true" size="large">
            {{ $t('biover.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.is_editable" :label="false" size="large">
            {{ $t('biover.configurator.no') }}
          </el-radio>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">
          {{ $t('biover.configurator.cancel') }}
        </el-button>
        <el-button type="primary" @click="save">
          {{ $t('biover.configurator.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex';

import { createBiover } from '../../../../utils/api.js';

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
      form: {},
      defaultForm: {
        name: '',
        is_public: true,
        is_editable: false,
      },
    };
  },
  methods: {
    async save() {
      const newBiover = await createBiover(this.form);
      console.log(newBiover);
      this.addNewBiover(newBiover.data);
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewBiover']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.defaultForm));
  },
};
</script>
