<template>
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs">
      <el-tab-pane
      label="BIOVERS"
      name="1"
      >
      <el-tree :data="data" show-checkbox @check="selectedBiovers"/>
      <el-button style="display: flex;" @click="showDialog = true">Créer un biover</el-button>
    </el-tab-pane>
    <el-tab-pane
      v-for="item in bioversToDisplay"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      >
        <DataTab :biovers="item.biover" @poi-to-display="$emit('poiToDisplay', $event)"
        @path-to-display="$emit('pathToDisplay', $event)"
        @update-poi="$emit('updatePoi', $event)"/>
      </el-tab-pane>
  </el-tabs>
  <BioverCreator :showDialog="showDialog" @close="showDialog = false"
  @close-dialog="showDialog = false" @save="createBiover"/>
</template>

<script>
import { ref } from 'vue';

import DataTab from './DataTab.vue';
import BioverCreator from './BioverCreator.vue';

import getData from '../../api/biovers';

export default {
  props: {
    ownerBiovers: Object,
    bioversToDisplay: Array,
  },
  emits: ['poiToDisplay', 'pathToDisplay', 'updatePoi', 'selectedBiovers', 'createBiover', 'removeBiover'],
  components: { DataTab, BioverCreator },
  watch: {
    ownerBiovers: {
      deep: true,
      handler(newVal) {
        if (newVal.length !== this.currentBiovers.length) {
          const diff = newVal.filter((x) => !this.currentBiovers.includes(x));
          this.data[0].children.push({
            label: diff[0].name,
            id: diff[0].id,
          });
        }
      },
    },
  },
  data() {
    return {
      data: [],
      editableTabs: [{ title: 'POI', name: '1' }],
      editableTabsValue: ref('1'),
      index: 1,
      showDialog: false,
      currentBiovers: [],
    };
  },
  methods: {
    selectedBiovers(event) {
      const index = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === event.id);
      if (index === -1) {
        this.index += 1;
        this.editableTabsValue = ref(`${this.index}`);
        this.$emit('selectedBiovers', { index: this.index, biover: event });
      } else {
        this.$emit('removeBiover', event.id);
      }
    },
    async createBiover(event) {
      this.showDialog = false;
      const newBiover = await getData.createBiover(event);
      this.$emit('createBiover', newBiover.data.data);
    },
  },
  mounted() {
    this.currentBiovers = Array.from(this.ownerBiovers);
    const own = [];
    this.ownerBiovers.forEach((biover) => {
      own.push({
        label: biover.name,
        id: biover.id,
      });
    });
    this.data.push({
      label: 'Mes Biovers',
      children: own,
      disabled: true,
    });
  },
};
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #f4f5f7;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
