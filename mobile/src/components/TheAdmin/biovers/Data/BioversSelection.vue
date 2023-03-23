<template>
 <div>
    <div class="table-row-layout">
      <div class="layout-border">
        <div class="button-border-layout">
          <button class="button-layout button-selection" @click="selectTab(0)">
            <p class="material-symbols-sharp text-margin">apps</p>
            <p class="text-margin name-element">Biovers</p>
          </button>
        </div>
        <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="button-border-layout" :class="{'remove-border': biovers.biover.id === currentBioversId}">
          <button
            :class="{'button-unfocus': biovers.biover.id !== currentBioversId}"
            class="button-layout button-biovers"
            @click="selectTab(biovers.biover.id)"
          >
              <World :animate="biovers.biover.id === currentBioversId"/>
              <p class="text-margin name-element">{{ biovers.title }}</p>
              <p class="material-symbols-sharp" @click="closeTab(biovers.biover.id)">close</p>
          </button>
        </div>
      </div>
    </div>
    <div class="border-element">
      <div v-show="currentBioversId <= 0">
        <BioversLayout v-if="allBiovers" :biovers="allBiovers"/>
      </div>
      <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="background-black">
        <DataTab
          v-show="currentBioversId === biovers.biover.id"
          :bioverId="biovers.biover.id" />
      </div>
    </div>
    <BioverCreator :showDialog="showDialog" @close-dialog="showDialog = false"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import BioversLayout from '../../../TheBiovers/BioversLayout.vue';
import DataTab from './DataTab.vue';
import BioverCreator from '../Dialog/BioverCreator.vue';
import World from '../../../../assets/shared/world.vue';

export default {
  components: { BioversLayout, DataTab, BioverCreator, World },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    allBiovers() {
      return this.ownBiovers.concat(this.publicBiovers);
    },
    ...mapState('biovers', ['ownBiovers', 'publicBiovers', 'bioversToDisplay', 'addBioversInTab', 'currentBioversId']),
  },
  methods: {
    selectedBiovers(event) {
      this.addBioverToDisplay(event);
      this.addPoiToDisplay(event.id);
      this.addPathToDisplay(event.id);
      this.addTraceToDisplay(event.id);
      this.addEventToDisplay(event.id);
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
};
</script>

<style scoped>
@import './table-header.css';

.button-unfocus {
  background-color: #666666 !important;
  color: white;
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
  padding-left: 0px;
}

.text-margin {
  margin-right: 8px;
  white-space: nowrap;
}

.border-element {
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #FFFFFF;
}
</style>