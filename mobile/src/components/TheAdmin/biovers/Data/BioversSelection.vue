<template>
 <div>
    <div style="display: flex; flex-wrap: wrap; border-bottom: 1px solid white">
      <div class="button-border-layout">
        <button class="button-layout button-selection" @click="selectTab(0)">
          <p class="material-symbols-sharp text-margin">apps</p>
          <p class="text-margin">Biovers</p>
        </button>
      </div>
      <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="button-border-layout" :class="{'remove-border': biovers.biover.id === currentBioversId}">
        <button
          :class="{'button-unfocus': biovers.biover.id !== currentBioversId}"
          class="button-layout button-biovers"
        >
            <World :animate="biovers.biover.id === currentBioversId" @click="selectTab(biovers.biover.id)"/>
            <p class="text-margin" @click="selectTab(biovers.biover.id)">{{ biovers.title }}</p>
            <p class="material-symbols-sharp" @click="closeTab(biovers.biover.id)">close</p>
        </button>
      </div>
    </div>
    <div class="border-element">
      <div v-show="currentBioversId === 0">
        <el-tree ref="tree" node-key="id" :data="data" show-checkbox @check="selectedBiovers"/>
      </div>
      <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="data-layout">
        <DataTab
          v-show="currentBioversId === biovers.biover.id"
          :bioverId="biovers.biover.id" />
      </div>
    </div>
    <BioverCreator :showDialog="showDialog" @close-dialog="showDialog = false"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions } from 'vuex';

import DataTab from './DataTab.vue';
import BioverCreator from '../Dialog/BioverCreator.vue';
import World from '../../../../assets/shared/world.vue';

export default {
  components: { DataTab, BioverCreator, World },
  watch: {
    ownBiovers: {
      deep: true,
      handler(newVal) {
        if (newVal.length !== this.data[0].length) {
          const diff = newVal.filter((x) => !this.data[0].children
            .some((child) => child.id === x.id));
          diff.forEach((element) => {
            this.data[0].children.push({
              label: element.name,
              id: element.id,
            });
          });
        }
      },
    },
    publicBiovers: {
      deep: true,
      handler(newVal) {
        if (newVal.length !== this.data[1].length) {
          const diff = newVal.filter((x) => !this.data[1].children
            .some((child) => child.id === x.id));
          diff.forEach((element) => {
            this.data[1].children.push({
              label: element.name,
              id: element.id,
            });
          });
        }
      },
    },
    bioversToDisplay: {
      deep: true,
      handler(newVal) {
        if (newVal.length > 0) {
          const checked = [];
          newVal.forEach((val) => {
            checked.push(val.biover.id);
          });
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(checked, false);
          });
        } else if (newVal.length === 0) {
          this.$refs.tree.setCheckedKeys([], false);
        }
      },
    },
  },
  data() {
    return {
      data: [{
        id: 0,
        label: 'Mes Biovers',
        children: [],
        disabled: true,
      },
      {
        id: -1,
        label: 'Biovers Publiques',
        children: [],
        disabled: true,
      },
      ],
      editableTabsValue: ref('1'),
      showDialog: false,
    };
  },
  computed: {
    ...mapState('biovers', ['ownBiovers', 'publicBiovers', 'bioversToDisplay', 'addBioversInTab', 'currentBioversId']),
  },
  methods: {
    selectedBiovers(event) {
      const index = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === event.id);
      if (index === -1) {
        this.addBioverToDisplay(event);
        this.addPoiToDisplay(event.id);
        this.addPathToDisplay(event.id);
        this.addTraceToDisplay(event.id);
        this.addEventToDisplay(event.id);
      } else {
        this.removeBioverToDisplay(event.id);
      }
    },
    selectTab(id) {
      const tabIndex = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === id);
      if (tabIndex !== -1) {
        this.setCurrentBiover(this.bioversToDisplay[tabIndex].biover.id);
      } else {
        this.setCurrentBiover(0);
      }
    },
    closeTab(id) {
      this.removeBioverToDisplay(id);
      if (this.bioversToDisplay.length === 0) {
        this.setCurrentBiover(0);
      } else {
        this.setCurrentBiover(this.bioversToDisplay[this.bioversToDisplay.length - 1].biover.id);
      }
    },
    ...mapActions('biovers', ['addBioverToDisplay', 'removeBioverToDisplay', 'addPoiToDisplay', 'addPathToDisplay', 'addTraceToDisplay', 'addEventToDisplay', 'setCurrentBiover']),
  },
  deactivated() {
    this.data[0].children = [];
    this.data[1].children = [];
  },
};
</script>

<style scoped>
.remove-border {
  border-bottom: 1px solid black !important;
  margin-bottom: -1px;
}

.button-unfocus {
  background-color: #666666 !important;
  color: white;
}

.button-border-layout {
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #FFFFFF;
  border-radius: 2px 2px 0px 0px;
  margin-right: 5px;
}

.button-layout {
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
}

.button-selection {
  background-color: white;
  border: 0;
}

.button-biovers {
  color: white;
  background-color: black;
  border-style: solid;
  border-color: white;
}

.text-margin {
  margin-right: 8px;
}

.data-layout {
  background-color: black;
}

.border-element {
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #FFFFFF;
}
</style>