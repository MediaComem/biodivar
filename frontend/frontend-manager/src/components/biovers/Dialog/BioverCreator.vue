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
