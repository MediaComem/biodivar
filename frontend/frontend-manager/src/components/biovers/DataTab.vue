<template>
  <div>
    <el-tabs v-model="editableTabsValue"
      type="card" class="demo-tabs">
      <el-tab-pane
      label="POI"
      name="1"
      >
        <PoiTable :data="getPois" @poi-to-display="$emit('poiToDisplay', $event)"
        @update-poi="$emit('updatePoi', $event)"/>
      </el-tab-pane>
      <el-tab-pane
      label="PATH"
      name="2"
      >
        <PathTable :data="getPath" @path-to-display="$emit('pathToDisplay', $event)"/>
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
    biovers: Array,
  },
  emits: ['poiToDisplay', 'pathToDisplay', 'updatePoi'],
  components: { PoiTable, PathTable },
  data() {
    return {
      editableTabs: [{ title: 'POI', name: '1' }, { title: 'PATH', name: '2' }, { title: 'TRACE', name: '3' }],
      editableTabsValue: ref('1'),
    };
  },
  computed: {
    getPois() {
      const data = [];
      this.biovers.forEach((row) => {
        row.Poi.forEach((poiElement) => {
          data.push({
            name: row.name,
            type: 'POI',
            element: poiElement,
            coordinate: poiElement.coordinate,
          });
        });
      });
      return data;
    },
    getPath() {
      const data = [];
      this.biovers.forEach((row) => {
        row.Path.forEach((pathElement) => {
          data.push({
            name: row.name,
            type: 'PATH',
            element: pathElement,
            coordinate: pathElement.coordinate,
          });
        });
      });
      return data;
    },
  },
};
</script>
