<template>
  <div>
    <div class="layout">
      <button
        @click="selectTab(1)"
        :class="{'button-focus': currentTab === 1}"
      >
        <p class="material-symbols-sharp text-margin">pin_drop</p>
        <p class="name-element">points d'intérêt [{{ getPoisByBiover(bioverId).length }}]</p>
      </button>
      <button
        @click="selectTab(2)"
        :class="{'button-focus': currentTab === 2}"
      >
        <p class="material-symbols-sharp text-margin">gesture</p>
        <p class="name-element">traces [{{ getPathsByBiover(bioverId).length }}]</p>
      </button>
      <button
        @click="selectTab(3)"
        :class="{'button-focus': currentTab === 3}"
      >
        <p class="material-symbols-sharp text-margin">gesture</p>
        <p class="name-element">paramètres</p>
      </button>
      <button
        @click="selectTab(4)"
        :class="{'button-focus': currentTab === 4}"
      >
        <p class="material-symbols-sharp text-margin">bar_chart</p>
        <p class="name-element">Trace [{{ getTraceByBioversAndUser(bioverId).length }}]</p>
      </button>
      <button
        @click="selectTab(5)"
        :class="{'button-focus': currentTab === 5}"
      >
        <p class="material-symbols-sharp text-margin">bar_chart</p>
        <p class="name-element">Event [{{ getEventByBioversAndUser(bioverId).length }}]</p>
      </button>
    </div>

    <div class="data-table-layout">
      <PoiTable v-show="currentTab === 1" :bioverId="bioverId" />
      <PathTable v-show="currentTab === 2" :bioverId="bioverId" />
      <ParameterTable v-show="currentTab === 3" :bioverId="bioverId" />
      <TraceTable v-show="currentTab === 4" :bioverId="bioverId" />
      <EventTable v-show="currentTab === 5" :bioverId="bioverId" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PoiTable from './PoiTable.vue';
import PathTable from './PathTable.vue';
import ParameterTable from './ParameterTable.vue';
import TraceTable from './TraceTable.vue';
import EventTable from './EventTable.vue';

export default {
  props: {
    bioverId: Number,
  },
  components: {
    PoiTable,
    PathTable,
    ParameterTable,
    TraceTable,
    EventTable,
  },
  data() {
    return {
      currentTab: 1,
    };
  },
  methods: {
    selectTab(tabId) {
      this.currentTab = tabId;
    }
  },
  computed: {
    ...mapGetters('biovers', ['getPoisByBiover', 'getPathsByBiover', 'getTraceByBioversAndUser', 'getEventByBioversAndUser']),
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid white;
}

.name-element {
      margin-top: 17px;
}

.data-table-layout {
  padding-bottom: 8px;
}

button {
  color: white;
  background-color: #666666;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: white;
  border-radius: 2px 2px 0px 0px;
  margin-right: 8px;
  cursor: pointer;
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #666666;
}

.button-focus {
  background-color: black;
  border-bottom: 1px solid black;
}

p {
  padding-right: 8px;
}
</style>

