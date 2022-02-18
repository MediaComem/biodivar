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
        <DataTab :ownerBiovers="ownerBiovers" @poi-to-display="$emit('poiToDisplay', $event)"
        @path-to-display="$emit('pathToDisplay', $event)"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import DataTab from './DataTab.vue';

export default {
  props: {
    ownerBiovers: Array,
  },
  emits: ['poiToDisplay', 'pathToDisplay'],
  data() {
    return {
      editableTabs: [{ title: 'My Biovers', name: '1' }],
      editableTabsValue: ref('1'),
      index: 1,
    };
  },
  components: { DataTab },
  methods: {
    poiToDisplay(event) {
      this.$emit('poiToDisplay', event);
    },
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
