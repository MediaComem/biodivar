<template>
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs">
      <el-tab-pane
      label="BIOVERS"
      name="1"
      >
      <el-tree :data="data" show-checkbox @check="selectedBiovers"/>
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
</template>

<script>
import { ref } from 'vue';

import DataTab from './DataTab.vue';

export default {
  props: {
    ownerBiovers: Object,
    bioversToDisplay: Array,
  },
  emits: ['poiToDisplay', 'pathToDisplay', 'updatePoi', 'selectedBiovers'],
  components: { DataTab },
  data() {
    return {
      data: [],
      editableTabs: [{ title: 'POI', name: '1' }],
      editableTabsValue: ref('1'),
      index: 1,
    };
  },
  methods: {
    selectedBiovers(event) {
      this.index += 1;
      this.editableTabsValue = ref(`${this.index}`);
      this.$emit('selectedBiovers', { index: this.index, biover: event });
    },
  },
  mounted() {
    const own = [];
    this.ownerBiovers.forEach((biover) => {
      own.push({
        label: biover.name,
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
