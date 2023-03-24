<template>
  <el-input
    v-model="filter_input"
    placeholder="Filter"
    @input="filtering"
    clearable
    style="margin-bottom: 1rem"
  />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Filter',
  data() {
    return {
      filter_input: '',
    };
  },
  methods: {
    filtering() {
      this.filter(this.filter_input);
    },
    ...mapActions('biovers', ['filter']),
  },
};
</script>
