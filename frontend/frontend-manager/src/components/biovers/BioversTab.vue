<template>
  <div>
    <el-button size="small" @click="addTab(editableTabsValue)">
    add tab
    </el-button>
    <el-tabs v-model="editableTabsValue"
      type="card" class="demo-tabs">
      <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      >
        <DataTab :biovers="biovers" @poi-to-display="$emit('poiToDisplay', $event)"
        @path-to-display="$emit('pathToDisplay', $event)"
        @update-poi="$emit('updatePoi', $event)"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import DataTab from './DataTab.vue';

export default {
  props: {
    biovers: Array,
  },
  emits: ['poiToDisplay', 'pathToDisplay', 'updatePoi'],
  data() {
    return {
      editableTabs: [],
      editableTabsValue: undefined,
      index: 0,
    };
  },
  components: { DataTab },
  methods: {
    addTab() {
      this.index += 1;
      const newTabName = `${this.index}`;
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    },
  },
  mounted() {
    this.editableTabs.push({
      title: this.biovers[0].name,
      name: '1',
    });
    this.editableTabsValue = ref('1');
    this.index = 1;
  },
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #f4f5f7;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
