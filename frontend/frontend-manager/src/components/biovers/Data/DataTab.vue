<template>
  <div>
    <el-tabs v-model="editableTabsValue"
      type="card" class="demo-tabs">
      <el-tab-pane
      :label="$t('table.poi')"
      name="1"
      >
        <PoiTable :bioverId="bioverId" />
      </el-tab-pane>
      <el-tab-pane
      :label="$t('table.path')"
      name="2"
      >
        <PathTable :bioverId="bioverId" />
      </el-tab-pane>
      <el-tab-pane
      :label="$t('table.trace')"
      name="3"
      >
        <TraceTable :bioverId="bioverId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';

import PoiTable from './PoiTable.vue';
import PathTable from './PathTable.vue';
import TraceTable from './TraceTable.vue';

export default {
  props: {
    biovers: Object,
    bioverId: Number,
  },
  components: { PoiTable, PathTable, TraceTable },
  data() {
    return {
      editableTabs: [{ title: 'POI', name: '1' }, { title: 'PATH', name: '2' }, { title: 'TRACE', name: '3' }],
      editableTabsValue: ref('1'),
    };
  },
};
</script>
