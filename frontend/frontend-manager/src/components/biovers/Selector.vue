<template>
  <el-tabs type='card'>
    <el-tab-pane label='My Biovers'>
      <el-tree :data='data' show-checkbox node-key='id' :props='defaultProps' />
    </el-tab-pane>
    <el-tab-pane label='Public Biovers'>
      <ul v-for='(item, index) in publicBiovers' :key='index'>
        <li>{{ item.name }}</li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    ownerBiovers: Array,
    publicBiovers: Array,
  },
  /*
  computed: {
    getOwnerData() {
      this.ownerBiovers.forEach((biover) >= {
        const pois = [];
        this.data.push({
          id: biover.id,
          label: biover.name,
          children:
        })
      });
    },
  },
  */
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      data: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
            {
              id: 6,
              label: 'Level two 2-2',
            },
          ],
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ],
    };
  },
};
</script>
