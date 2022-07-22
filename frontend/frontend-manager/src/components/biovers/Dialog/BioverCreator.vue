<script setup>
import {
  defineProps,
  defineEmits,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';

import getData from '../../../api/biovers';

const props = defineProps({
  showDialog: Boolean,
});

const emit = defineEmits(['closeDialog']);

const store = useStore();

const dialogVisible = ref(false);
const formLabelWidth = ref('140px');
const form = ref({
  name: '',
  is_public: true,
  is_editable: false,
});

watch(() => props.showDialog, (newVal) => {
  dialogVisible.value = newVal;
  form.value.name = '';
});

function addNewBiover(newBiover) {
  store.dispatch('biovers/addNewBiover', newBiover);
}

function setCurrentBiover() {
  store.dispatch('biovers/setCurrentBiover', 0);
}

async function save() {
  const newBiover = await getData.createBiover(form.value);
  addNewBiover(newBiover.data.data);
  setCurrentBiover();
  emit('closeDialog');
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="$t('biover.configurator.title')"
    @close="emit('closeDialog')">
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
        <el-button @click="emit('closeDialog')">
          {{ $t('biover.configurator.cancel') }}
        </el-button>
        <el-button type="primary" @click="save">
          {{ $t('biover.configurator.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
