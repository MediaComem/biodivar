<template>
<div v-if="showDialog" class="overlay" @click="close"></div>
  <div v-if="showDialog" class="modal-edition">
    <DialogHeader :title="'Séléction des colonnes'" :logo="'add_location_alt'" @close="close" />
    <div class="container-layout">
      <div class="line-div"><el-checkbox v-model="form.created_date" :label="$t('Path.Column.date')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.author" :label="$t('Path.Column.author')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.coordinate" :label="$t('Path.Column.coordinate')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.scope" :label="$t('Path.Column.visibility')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_width" :label="$t('Path.Column.style_stroke_width')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_color" :label="$t('Path.Column.style_color')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_opacity" :label="$t('Path.Column.style_stroke_opacity')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.extrusion" :label="$t('Path.Column.extrusion')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.elevation" :label="$t('Path.Column.style_elevation')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.animation" :label="$t('Path.Column.animation')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.metadata" :label="$t('Path.Column.metadata')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.updated_date" :label="$t('Path.Column.update_date')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.contributor" :label="$t('Path.Column.last_contributor')" size="large" /></div>
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
import { mapGetters, mapActions } from 'vuex';
import DialogHeader from './DialogHeader.vue';

export default {
  components: { DialogHeader },
  props: {
    showDialog: Boolean,
  },
  emits: ['closeDialog'],
  data() {
    return {
        form: {},
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog');
    },
    save() {
        this.savePathColumns(this.form);
        this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['savePathColumns'])
  },
  computed: {
    ...mapGetters('biovers', ['getPathColumnsPreference']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.getPathColumnsPreference));
  }
}
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
    height: 580px;
    position: fixed;
    top: calc((100vh - 580px) / 2);
    left: 15vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
    overflow: auto;
  }
}

@media screen and (max-width: 999px) {
  .modal-edition {
    background-color: white;
    width: 95vw;
    height: 580px;
    position: fixed;
    top: calc((100vh - 580px) / 2);
    left: 2.5vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
    overflow: auto;
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

.line-div {
    display: flex;
    padding-left: 10px;
}
</style>