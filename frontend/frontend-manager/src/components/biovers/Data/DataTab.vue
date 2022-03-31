<template>
  <div>
    <el-tabs v-model="editableTabsValue"
      type="card" class="demo-tabs">
      <el-tab-pane
      label="POI"
      name="1"
      >
        <PoiTable :bioverId="bioverId" />
      </el-tab-pane>
      <el-tab-pane
      label="PATH"
      name="2"
      >
        <PathTable :bioverId="bioverId" />
      </el-tab-pane>
      <el-tab-pane
      label="TRACE"
      name="3"
      >
        USER TRACE
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';

import PoiTable from './PoiTable.vue';
import PathTable from './PathTable.vue';

export default {
  props: {
    biovers: Object,
    bioverId: Number,
  },
  components: { PoiTable, PathTable },
  data() {
    return {
      editableTabs: [{ title: 'POI', name: '1' }, { title: 'PATH', name: '2' }, { title: 'TRACE', name: '3' }],
      editableTabsValue: ref('1'),
    };
  },
};
</script>
