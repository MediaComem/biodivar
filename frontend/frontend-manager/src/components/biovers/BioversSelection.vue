<template>
  <el-tree :data="data" show-checkbox @check="selectedBiovers"/>
</template>

<script>
export default {
  props: {
    ownerBiovers: Object,
  },
  emits: ['selectedBiovers'],
  data() {
    return {
      data: [],
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
