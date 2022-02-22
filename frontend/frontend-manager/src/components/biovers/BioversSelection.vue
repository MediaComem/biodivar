<template>
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs">
      <el-tab-pane
      label="BIOVERS"
      name="1"
      >
      <el-tree :data="data" show-checkbox @check="selectedBiovers"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    ownerBiovers: Object,
  },
  emits: ['selectedBiovers'],
  data() {
    return {
      data: [],
      editableTabs: [{ title: 'POI', name: '1' }],
      editableTabsValue: ref('1'),
    };
  },
  methods: {
    selectedBiovers(event) {
      const selectBiover = this.ownerBiovers.find((e) => e.name === event.label);
      this.$emit('selectedBiovers', selectBiover);
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
