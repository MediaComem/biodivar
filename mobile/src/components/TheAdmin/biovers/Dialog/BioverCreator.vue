<template>
  <div v-if="dialogVisible" class="overlay" @click="close"></div>
  <div v-if="dialogVisible" class="modal-edition">
    <DialogHeader :title="$t('biover.configurator.title')" :logo="'add_location_alt'" @close="close" />
    <div class="container-layout">
      <div style="display: flex">
        <div class="col-main">{{ $t('biover.configurator.name') }}</div>
        <div class="col2"><el-input v-model="form.name" autocomplete="off"></el-input></div>
      </div>
      <div style="display: flex">
        <div class="col-main">Description</div>
        <div class="col2"><el-input v-model="form.description" autocomplete="off"></el-input></div>
      </div>
      <div style="display: flex">
        <div class="col-main">Location</div>
        <div class="col2"><el-input v-model="form.location" autocomplete="off"></el-input></div>
      </div>
      <div style="display: flex">
        <div class="col-main">{{$t('biover.configurator.public')}}</div>
        <div class="col2">
          <el-radio v-model="form.is_public" :label="true" size="large">
            {{ $t('biover.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.is_public" :label="false" size="large">
            {{ $t('biover.configurator.no') }}
          </el-radio>
        </div>
      </div>
      <div style="display: flex">
        <div class="col-main">{{$t('biover.configurator.editable')}}</div>
        <div class="col2">
          <el-radio v-model="form.is_editable" :label="true" size="large">
            {{ $t('biover.configurator.yes') }}
          </el-radio>
          <el-radio v-model="form.is_editable" :label="false" size="large">
            {{ $t('biover.configurator.no') }}
          </el-radio>
        </div>
      </div>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-dark-gray" @click="close"><p class="material-symbols-sharp">undo</p>{{ $t('biover.configurator.cancel') }}</button>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-blue" @click="save()" ><p class="material-symbols-sharp">where_to_vote</p>{{ $t('biover.configurator.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

import { useStore } from '../../../../composables/store.js';

import { createBiover } from '../../../../utils/api.js';

import DialogHeader from './DialogHeader.vue';

export default {
  components: { DialogHeader },
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
        description: '',
        location: '',
        is_public: true,
        is_editable: false,
      },
    };
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.$emit('closeDialog');
    },
    async save() {
      const { biovers } = useStore();
      const newBiover = await createBiover(this.form);
      this.addNewBiover(newBiover.data);
      biovers.value.push(newBiover.data);
      this.addBioverToDisplay(newBiover.data);
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewBiover', 'addBioverToDisplay']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.defaultForm));
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000000;
}

@media screen and (min-width: 1000px) {
  .modal-edition {
    background-color: white;
    width: 70vw;
    height: 330px;
    position: fixed;
    top: 25vh;
    left: 15vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media screen and (max-width: 999px) {
  .modal-edition {
    background-color: white;
    width: 95vw;
    height: 330px;
    position: fixed;
    top: 25vh;
    left: 2.5vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.col-main {
  width: 100px;
  display: flex;
  align-items: center;
  padding-left: 6px;
  height: 34px;
}

.col2 {
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  height: 34px;
}

.input-full-size-element {
  width: 100%;
  margin-right: 5px;
}

.full-button {
  width: 100%;
  border-radius: 100px;
  height: 40px;
}

.actions-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.button-dark-gray {
  background-color: #666666;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-blue {
  background-color: #2F80ED;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

p {
  margin-top: 6px;
  margin-bottom: 6px;
}

button {
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>