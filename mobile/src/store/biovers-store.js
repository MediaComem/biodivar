import { getBiovers, getBioversByUser } from '../utils/api.js';
import filterUtils from '../utils/filters.js';
import { getPoiColumns, getPathColumns, getTracesColumns, getEventsColumns } from '../utils/columns.js';
import { useStore } from '../composables/store.js';

const { username } = useStore();
 
export const bioversStore = {
  namespaced: true,
  state() {
    return {
      index: 1,
      userPreference: [],
      poiColumnsPreference: undefined,
      pathColumnsPreference: undefined,
      traceColumnsPreference: undefined,
      eventColumnsPreference: undefined,
      ownBiovers: [],
      publicBiovers: [],
      addBioversInTab: false,
      bioversToDisplay: [],
      currentBioversId: -1,
      pois: [],
      poisModification: {},
      paths: [],
      pathsModification: {},
      traces: [],
      events: [],
      uploadInProgress: false,
      uploadDone: false,
      filter: '',
      copyElement: undefined,
    };
  },
  mutations: {
    SAVE_OWNER_BIOVERS(state, ownerBiovers) {
      state.ownBiovers = ownerBiovers;
    },
    SAVE_PUBLIC_BIOVERS(state, publicBiovers) {
      state.publicBiovers = publicBiovers;
    },
    SET_CURRENT_BIOVER(state, bioverId) {
      state.currentBioversId = bioverId;
    },
    SELECT_BIOVER(state, selectBiover) {
      state.index += 1;
      state.addBioversInTab = true;
      state.bioversToDisplay.push({
        title: selectBiover.name,
        name: `${state.index}`,
        biover: selectBiover,
      });
      if (!state.userPreference.includes(selectBiover.id)) {
        state.userPreference.push(selectBiover.id);
      }
      state.currentBioversId = selectBiover.id;
    },
    LOAD_POI_COLUMNS(state) {
      state.poiColumnsPreference = getPoiColumns();
    },
    SAVE_POI_COLUMNS(state, columns) {
      state.poiColumnsPreference = columns;
    },
    LOAD_PATH_COLUMNS(state) {
      state.pathColumnsPreference = getPathColumns();
    },
    SAVE_PATH_COLUMNS(state, columns) {
      state.pathColumnsPreference = columns;
    },
    LOAD_TRACE_COLUMNS(state) {
      state.traceColumnsPreference = getTracesColumns();
    },
    SAVE_TRACE_COLUMNS(state, columns) {
      state.traceColumnsPreference = columns;
    },
    LOAD_EVENT_COLUMNS(state) {
      state.eventColumnsPreference = getEventsColumns();
    },
    SAVE_EVENT_COLUMNS(state, columns) {
      state.eventColumnsPreference = columns;
    },
    ADD_NEW_BIOVER(state, biover) {
      state.ownBiovers.push(biover);
    },
    REMOVE_BIOVER(state, bioverId) {
      state.addBioversInTab = false;
      const preferenceIndex = state.userPreference.findIndex((id) => id === bioverId);
      state.userPreference.splice(preferenceIndex, 1);
      const index = state.bioversToDisplay.findIndex((biovers) => biovers.biover.id === bioverId);
      state.bioversToDisplay.splice(index, 1);
      const poisIndex = state.pois.findIndex((e) => e.bioverId === bioverId);
      state.pois.splice(poisIndex, 1);
      const pathsIndex = state.paths.findIndex((e) => e.bioverId === bioverId);
      state.paths.splice(pathsIndex, 1);
      const tracesIndex = state.traces.findIndex((e) => e.bioverId === bioverId);
      state.traces.splice(tracesIndex, 1);
      const eventIndex = state.events.findIndex((e) => e.bioverId === bioverId);
      state.events.splice(eventIndex, 1);
    },
    DELETE_BIOVERS(state, bioverId) {
      const ownBioversIndex = state.ownBiovers.findIndex((b) => b.id === bioverId);
      if (ownBioversIndex !== -1) {
        state.ownBiovers.splice(ownBioversIndex, 1);
      } else {
        const publicBioversIndex = state.publicBiovers.findIndex((b) => b.id === bioverId);
        if (publicBioversIndex !== -1) {
          state.ownBiovers.splice(publicBioversIndex, 1);
        }
      }
    },
    SAVE_POI_TO_DISPLAY(state, payload) {
      state.pois.push({ bioverId: payload.id, pois: payload.pois });
    },
    UPDATE_POI_TO_DISPLAY(state, payload) {
      const poisIndex = state.pois.findIndex((e) => e.bioverId === payload.bioverId);
      const poiIndex = state.pois[poisIndex].pois
        .findIndex((e) => e.element.id === payload.poi.element.id);
      state.pois[poisIndex].pois[poiIndex].display = !state.pois[poisIndex].pois[poiIndex].display;
    },
    UPDATE_POI(state, poi) {
      const poisIndex = state.pois.findIndex((e) => e.bioverId === poi.biovers);
      const poiIndex = state.pois[poisIndex].pois
        .findIndex((e) => e.element.id === poi.id);
      state.pois[poisIndex].pois[poiIndex].element = poi;
    },
    SAVE_PATH_TO_DISPLAY(state, payload) {
      state.paths.push({ bioverId: payload.id, paths: payload.paths });
    },
    UPDATE_PATH_TO_DISPLAY(state, payload) {
      const pathsIndex = state.paths.findIndex((e) => e.bioverId === payload.bioverId);
      const pathIndex = state.paths[pathsIndex].paths
        .findIndex((e) => e.element.id === payload.path.element.id);
      state.paths[pathsIndex].paths[pathIndex].display = !state.paths[pathsIndex]
        .paths[pathIndex].display;
    },
    SAVE_TRACE_TO_DISPLAY(state, payload) {
      state.traces.push({ bioverId: payload.id, traces: payload.traces });
    },
    SAVE_EVENT_TO_DISPLAY(state, payload) {
      state.events.push({ bioverId: payload.id, events: payload.events });
    },
    UPDATE_EVENT_TO_DISPLAY(state, payload) {
      const eventsIndex = state.events.findIndex((e) => e.bioverId === payload.bioverId);
      const eventIndex = state.events[eventsIndex].events
        .findIndex((e) => e.element.id === payload.event.element.id);
      state.events[eventsIndex].events[eventIndex].display = !state.events[eventsIndex]
        .events[eventIndex].display;
    },
    UPDATE_TRACE_TO_DISPLAY(state, payload) {
      const tracesIndex = state.traces.findIndex((e) => e.bioverId === payload.bioverId);
      const traceIndex = state.traces[tracesIndex].traces
        .findIndex((e) => e.element.id === payload.trace.element.id);
      state.traces[tracesIndex].traces[traceIndex].display = !state.traces[tracesIndex]
        .traces[traceIndex].display;
    },
    ADD_INTO_POI(state, poi) {
      let index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      if (index === -1) {
        state.pois.push({
          bioverId: poi.biovers,
          pois: [],
        })
        index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      }
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      const poiElementToAdd = {
        name: state.bioversToDisplay[bioverToDisplayIndex].title,
        element: poi,
        display: true,
        import: false,
      };
      state.pois[index].pois.push(poiElementToAdd);
      state.poisModification = { element: poiElementToAdd };
    },
    REMOVE_INTO_POI(state, poi) {
      const index = state.pois.findIndex((e) => e.bioverId === poi.biovers);
      const poiIndex = state.pois[index].pois.findIndex((e) => e.element.id === poi.id);
      state.pois[index].pois.splice(poiIndex, 1);
    },
    ADD_INTO_PATH(state, path) {
      let index = state.paths.findIndex((e) => e.bioverId === state.currentBioversId);
      if (index === -1) {
        state.paths.push({
          bioverId: path.biovers,
          paths: [],
        })
        index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      }
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      const pathElementToAdd = {
        name: state.bioversToDisplay[bioverToDisplayIndex].title,
        element: path,
        display: true,
        import: false,
      };
      state.paths[index].paths.push(pathElementToAdd);
      state.pathsModification = { element: pathElementToAdd };
    },
    REMOVE_INTO_PATH(state, path) {
      const index = state.paths.findIndex((e) => e.bioverId === path.biovers);
      const pathIndex = state.paths[index].paths.findIndex((e) => e.element.id === path.id);
      state.paths[index].paths.splice(pathIndex, 1);
    },
    REMOVE_INTO_TRACE(state, trace) {
      const index = state.traces.findIndex((e) => e.bioverId === trace.biovers);
      const traceIndex = state.traces[index].traces.findIndex((e) => e.element.id === trace.id);
      state.traces[index].traces.splice(traceIndex, 1);
    },
    REMOVE_INTO_EVENT(state, event) {
      const index = state.events.findIndex((e) => e.bioverId === event.biovers);
      const eventIndex = state.events[index].events.findIndex((e) => e.element.id === event.id);
      state.events[index].events.splice(eventIndex, 1);
    },
    IMPORT_POI(state, pois) {
      if (pois.length === 0) {
        state.uploadInProgress = true;
        return;
      }
      let index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      if (index === -1) {
        state.pois.push({
          bioverId: pois[0].biovers,
          pois: [],
        })
        index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      }
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      const modifications = [];
      pois.forEach((poi) => {
        const poiElementToAdd = {
          name: state.bioversToDisplay[bioverToDisplayIndex].title,
          element: poi,
          display: true,
          import: true,
        };
        state.pois[index].pois.push(poiElementToAdd);
        modifications.push({ element: poiElementToAdd });
      });
      state.poisModification = modifications;
      state.uploadInProgress = true;
    },
    IMPORT_PATH(state, paths) {
      if (paths.length === 0) {
        state.uploadInProgress = true;
        return;
      }
      let index = state.paths.findIndex((e) => e.bioverId === state.currentBioversId);
      if (index === -1) {
        state.paths.push({
          bioverId: paths[0].biovers,
          paths: [],
        })
        index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      }
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      const modifications = [];
      paths.forEach((path) => {
        const pathElementToAdd = {
          name: state.bioversToDisplay[bioverToDisplayIndex].title,
          element: path,
          display: true,
          import: true,
        };
        state.paths[index].paths.push(pathElementToAdd);
        modifications.push({ element: pathElementToAdd });
      });
      state.pathsModification = modifications;
      state.uploadInProgress = true;
    },
    UPDATE_IMPORT_POIS(state, pois) {
      const index = state.pois.findIndex((e) => e.bioverId === pois[0].biovers);
      let saveIndex = 0;
      for (let i = 0; i < state.pois[index].pois.length; i += 1) {
        if (state.pois[index].pois[i].import) {
          state.pois[index].pois[i].import = false;
          state.pois[index].pois[i].element.id = pois[saveIndex].id;
          state.pois[index].pois[i].element.creation_date = pois[saveIndex].creation_date;
          state.pois[index].pois[i].element.author = pois[saveIndex].author;
          state.pois[index].pois[i].element.last_contributor = pois[saveIndex].last_contributor;
          state.pois[index].pois[i].element.User = pois[saveIndex].User;
          state.pois[index].pois[i].element.last_contributor_fk = pois[saveIndex]
            .last_contributor_fk;
          state.pois[index].pois[i].element.symbol = pois[saveIndex].symbol;
          state.pois[index].pois[i].element.media = pois[saveIndex].media;
          saveIndex += 1;
        }
      }
    },
    UPDATE_IMPORT_PATHS(state, paths) {
      const index = state.paths.findIndex((e) => e.bioverId === paths[0].biovers);
      let saveIndex = 0;
      for (let i = 0; i < state.paths[index].paths.length; i += 1) {
        if (state.paths[index].paths[i].import) {
          state.paths[index].paths[i].import = false;
          state.paths[index].paths[i].element.id = paths[saveIndex].id;
          state.paths[index].paths[i].element.creation_date = paths[saveIndex].creation_date;
          state.paths[index].paths[i].element.author = paths[saveIndex].author;
          state.paths[index].paths[i].element.last_contributor = paths[saveIndex].last_contributor;
          state.paths[index].paths[i].element.User = paths[saveIndex].User;
          state.paths[index].paths[i].element.last_contributor_fk = paths[saveIndex]
            .last_contributor_fk;
          state.paths[index].paths[i].element.symbol = paths[saveIndex].symbol;
          state.paths[index].paths[i].element.media = paths[saveIndex].media;
          saveIndex += 1;
        }
      }
    },
    UPLOAD_DONE(state) {
      if (state.uploadInProgress) {
        state.uploadInProgress = false;
        state.uploadDone = true;
      }
    },
    RESET_UPLOAD(state) {
      state.uploadDone = false;
    },
    ADD_POI_INTO_BIOVER(state, poi) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      state.bioversToDisplay[bioverToDisplayIndex].biover.Poi.push(poi);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === state.currentBioversId);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === state.currentBioversId);
        state.publicBiovers[index].Poi.push(poi);
      } else {
        state.ownBiovers[index].Poi.push(poi);
      }
    },
    REMOVE_POI_INTO_BIOVER(state, poi) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === poi.biovers);
      const bioversToDisplayPoiIndex = state.bioversToDisplay[bioverToDisplayIndex].biover.Poi.findIndex((p) => p.id === poi.id);
      state.bioversToDisplay[bioverToDisplayIndex].biover.Poi.splice(bioversToDisplayPoiIndex, 1);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === poi.biovers);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === poi.biovers);
        let poiIndex = state.publicBiovers[index].Poi.findIndex((p) => p.id === poi.id);
        state.publicBiovers[index].Poi.splice(poiIndex, 1);
      } else {
        let poiIndex = state.ownBiovers[index].Poi.findIndex((p) => p.id === poi.id);
        state.ownBiovers[index].Poi.splice(poiIndex, 1);
      }
    },
    ADD_PATH_INTO_BIOVER(state, path) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === state.currentBioversId);
      state.bioversToDisplay[bioverToDisplayIndex].biover.Path.push(path);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === state.currentBioversId);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === state.currentBioversId);
        state.publicBiovers[index].Path.push(path);
      } else {
        state.ownBiovers[index].Path.push(path);
      }
    },
    REMOVE_PATH_INTO_BIOVER(state, path) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === path.biovers);
      const bioversToDisplayPathIndex = state.bioversToDisplay[bioverToDisplayIndex].biover.Path.findIndex((p) => p.id === path.id);
      state.bioversToDisplay[bioverToDisplayIndex].biover.Path.splice(bioversToDisplayPathIndex, 1);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === path.biovers);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === path.biovers);
        let pathIndex = state.publicBiovers[index].Path.findIndex((p) => p.id === path.id);
        state.publicBiovers[index].Path.splice(pathIndex, 1);
      } else {
        let pathIndex = state.ownBiovers[index].Path.findIndex((p) => p.id === path.id);
        state.ownBiovers[index].Path.splice(pathIndex, 1);
      }
    },
    REMOVE_TRACE_INTO_BIOVER(state, trace) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === trace.biovers);
      const bioversToDisplayTraceIndex = state.bioversToDisplay[bioverToDisplayIndex].biover.UserTrace.findIndex((p) => p.id === trace.id);
      state.bioversToDisplay[bioverToDisplayIndex].biover.UserTrace.splice(bioversToDisplayTraceIndex, 1);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === trace.biovers);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === trace.biovers);
        let traceIndex = state.publicBiovers[index].UserTrace.findIndex((p) => p.id === trace.id);
        state.publicBiovers[index].UserTrace.splice(traceIndex, 1);
      } else {
        let traceIndex = state.ownBiovers[index].UserTrace.findIndex((p) => p.id === trace.id);
        state.ownBiovers[index].UserTrace.splice(traceIndex, 1);
      }
    },
    REMOVE_EVENT_INTO_BIOVER(state, event) {
      const bioverToDisplayIndex = state.bioversToDisplay
        .findIndex((biover) => biover.biover.id === event.biovers);
      const bioversToDisplayEventIndex = state.bioversToDisplay[bioverToDisplayIndex].biover.Event.findIndex((p) => p.id === event.id);
      state.bioversToDisplay[bioverToDisplayIndex].biover.Event.splice(bioversToDisplayEventIndex, 1);
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === event.biovers);
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === event.biovers);
        let eventIndex = state.publicBiovers[index].Event.findIndex((p) => p.id === event.id);
        state.publicBiovers[index].Event.splice(eventIndex, 1);
      } else {
        let eventIndex = state.ownBiovers[index].Event.findIndex((p) => p.id === event.id);
        state.ownBiovers[index].Event.splice(eventIndex, 1);
      }
    },
    RESET_POI_MODIFICATION(state) {
      state.poisModification = null;
    },
    RESET_PATH_MODIFICATION(state) {
      state.pathsModification = null;
    },
    SELECT_ALL_POIS(state) {
      const poisIndex = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.pois[poisIndex].pois.length; i += 1) {
        state.pois[poisIndex].pois[i].display = true;
      }
    },
    UNSELECT_ALL_POIS(state) {
      const poisIndex = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.pois[poisIndex].pois.length; i += 1) {
        state.pois[poisIndex].pois[i].display = false;
      }
    },
    SELECT_ALL_PATHS(state) {
      const pathsIndex = state.paths.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.paths[pathsIndex].paths.length; i += 1) {
        state.paths[pathsIndex].paths[i].display = true;
      }
    },
    UNSELECT_ALL_PATHS(state) {
      const pathsIndex = state.paths.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.paths[pathsIndex].paths.length; i += 1) {
        state.paths[pathsIndex].paths[i].display = false;
      }
    },
    SELECT_ALL_EVENTS(state) {
      const eventsIndex = state.events.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.events[eventsIndex].events.length; i += 1) {
        state.events[eventsIndex].events[i].display = true;
      }
    },
    UNSELECT_ALL_EVENTS(state) {
      const eventsIndex = state.events.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.events[eventsIndex].events.length; i += 1) {
        state.events[eventsIndex].events[i].display = false;
      }
    },
    SELECT_ALL_TRACES(state) {
      const tracesIndex = state.traces.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.traces[tracesIndex].traces.length; i += 1) {
        state.traces[tracesIndex].traces[i].display = true;
      }
    },
    UNSELECT_ALL_TRACES(state) {
      const tracesIndex = state.traces.findIndex((e) => e.bioverId === state.currentBioversId);
      for (let i = 0; i < state.traces[tracesIndex].traces.length; i += 1) {
        state.traces[tracesIndex].traces[i].display = false;
      }
    },
    RESET_STORE(state) {
      state.ownBiovers = [];
      state.publicBiovers = [];
      state.bioversToDisplay = [];
      state.currentBioversId = -1;
      state.pois = [];
      state.poisModification = {};
      state.paths = [];
      state.traces = [];
      state.uploadInProgress = false;
      state.uploadDone = false;
    },
    FILTER(state, filter) {
      state.filter = filter;
    },
    COPY(state, payload) {
      state.copyElement = payload;
    }
  },
  actions: {
    resetBiovers({ commit }) {
      commit('RESET_STORE');
    },
    async getBiovers({ dispatch, commit, state }) {
      const ownerBiovers = await getBioversByUser();
      const publicB = await getBiovers();
      const difference = publicB.data.filter(
        (x) => !ownerBiovers.data.some((present) => present.id === x.id),
      );
      commit('SAVE_OWNER_BIOVERS', ownerBiovers.data);
      commit('SAVE_PUBLIC_BIOVERS', difference);
      state.userPreference.forEach((pref) => {
        let bioverIndex = ownerBiovers.data.findIndex((biover) => biover.id === pref);
        if (bioverIndex !== -1) {
          const biover = ownerBiovers.data[bioverIndex];
          commit('SELECT_BIOVER', biover);
          dispatch('addPoiToDisplay', biover.id);
          dispatch('addPathToDisplay', biover.id);
          dispatch('addTraceToDisplay', biover.id);
          dispatch('addEventToDisplay', biover.id);
        } else {
          bioverIndex = difference.findIndex((biover) => biover.id === pref);
          if (bioverIndex !== -1) {
            const biover = difference[bioverIndex];
            commit('SELECT_BIOVER', biover);
            dispatch('addPoiToDisplay', biover.id);
            dispatch('addPathToDisplay', biover.id);
            dispatch('addTraceToDisplay', biover.id);
            dispatch('addEventToDisplay', biover.id);
          }
        }
      });
    },
    setCurrentBiover({ commit }, bioverId) {
      commit('SET_CURRENT_BIOVER', bioverId);
    },
    loadPoiColumns({ commit }) {
      commit('LOAD_POI_COLUMNS')
    },
    savePoiColumns({ commit }, columns) {
      commit('SAVE_POI_COLUMNS', columns)
    },
    loadPathColumns({ commit }) {
      commit('LOAD_PATH_COLUMNS')
    },
    savePathColumns({ commit }, columns) {
      commit('SAVE_PATH_COLUMNS', columns)
    },
    loadTraceColumns({ commit }) {
      commit('LOAD_TRACE_COLUMNS')
    },
    saveTraceColumns({ commit }, columns) {
      commit('SAVE_TRACE_COLUMNS', columns)
    },
    loadEventColumns({ commit }) {
      commit('LOAD_EVENT_COLUMNS')
    },
    saveEventColumns({ commit }, columns) {
      commit('SAVE_EVENT_COLUMNS', columns)
    },
    addNewBiover({ commit }, biover) {
      commit('ADD_NEW_BIOVER', biover);
    },
    deleteBiovers({ commit }, bioverId) {
      commit('REMOVE_BIOVER', bioverId);
      commit('DELETE_BIOVERS', bioverId);
    },
    addBioverToDisplay({ commit, state }, event) {
      if (state.bioversToDisplay.findIndex((e) => e.biover.id === event.id) === -1) {
        let selectBiover = state.ownBiovers.find((e) => e.id === event.id);
        if (!selectBiover) {
          selectBiover = state.publicBiovers.find((e) => e.id === event.id);
        }
        commit('SELECT_BIOVER', selectBiover);
      }
    },
    removeBioverToDisplay({ commit }, id) {
      commit('REMOVE_BIOVER', id);
    },
    addPoiToDisplay({ commit, state }, bioverId) {
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === bioverId);
      let pois = [];
      let bioverName = '';
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === bioverId);
        pois = state.publicBiovers[index].Poi;
        bioverName = state.publicBiovers[index].name;
      } else {
        pois = state.ownBiovers[index].Poi;
        bioverName = state.ownBiovers[index].name;
      }
      const data = [];
      pois.forEach((poiElement) => {
        data.push({
          name: bioverName,
          element: poiElement,
          display: true,
          import: false,
        });
      });
      commit('SAVE_POI_TO_DISPLAY', {
        id: bioverId,
        pois: data,
      });
    },
    updatePoiToDisplay({ commit }, payload) {
      commit('UPDATE_POI_TO_DISPLAY', payload);
    },
    addPathToDisplay({ commit, state }, bioverId) {
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === bioverId);
      let paths = [];
      let bioverName = '';
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === bioverId);
        paths = state.publicBiovers[index].Path;
        bioverName = state.publicBiovers[index].name;
      } else {
        paths = state.ownBiovers[index].Path;
        bioverName = state.ownBiovers[index].name;
      }
      const data = [];
      paths.forEach((pathElement) => {
        data.push({
          name: bioverName,
          element: pathElement,
          display: true,
          import: false,
        });
      });
      commit('SAVE_PATH_TO_DISPLAY', {
        id: bioverId,
        paths: data,
      });
    },
    updatePathToDisplay({ commit }, payload) {
      commit('UPDATE_PATH_TO_DISPLAY', payload);
    },
    addTraceToDisplay({ commit, state }, bioverId) {
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === bioverId);
      let traces = [];
      let bioverName = '';
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === bioverId);
        traces = state.publicBiovers[index].UserTrace;
        bioverName = state.publicBiovers[index].name;
      } else {
        traces = state.ownBiovers[index].UserTrace;
        bioverName = state.ownBiovers[index].name;
      }
      const data = [];
      traces.forEach((traceElement) => {
        data.push({
          name: bioverName,
          element: traceElement,
          display: true,
          import: false,
        });
      });
      commit('SAVE_TRACE_TO_DISPLAY', {
        id: bioverId,
        traces: data,
      });
    },
    addEventToDisplay({ commit, state }, bioverId) {
      let index = state.ownBiovers.findIndex((biovers) => biovers.id === bioverId);
      let events = [];
      let bioverName = '';
      if (index === -1) {
        index = state.publicBiovers.findIndex((biovers) => biovers.id === bioverId);
        events = state.publicBiovers[index].Event;
        bioverName = state.publicBiovers[index].name;
      } else {
        events = state.ownBiovers[index].Event;
        bioverName = state.ownBiovers[index].name;
      }
      const data = [];
      events.forEach((eventElement) => {
        data.push({
          name: bioverName,
          element: eventElement,
          display: true,
          import: false,
        });
      });
      commit('SAVE_EVENT_TO_DISPLAY', {
        id: bioverId,
        events: data,
      });
    },
    updateEventToDisplay({ commit }, payload) {
      commit('UPDATE_EVENT_TO_DISPLAY', payload);
    },
    updateTraceToDisplay({ commit }, payload) {
      commit('UPDATE_TRACE_TO_DISPLAY', payload);
    },
    addNewPoi({ commit }, poi) {
      commit('ADD_INTO_POI', poi);
      commit('ADD_POI_INTO_BIOVER', poi);
    },
    removePoi({ commit }, poi) {
      commit('REMOVE_INTO_POI', poi);
      commit('REMOVE_POI_INTO_BIOVER', poi);
    },
    addNewPath({ commit }, poi) {
      commit('ADD_INTO_PATH', poi);
      commit('ADD_PATH_INTO_BIOVER', poi);
    },
    removePath({ commit }, path) {
      commit('REMOVE_INTO_PATH', path);
      commit('REMOVE_PATH_INTO_BIOVER', path);
    },
    removeTrace({ commit }, trace) {
      commit('REMOVE_INTO_TRACE', trace);
      commit('REMOVE_TRACE_INTO_BIOVER', trace);
    },
    removeEvent({ commit }, trace) {
      commit('REMOVE_INTO_EVENT', trace);
      commit('REMOVE_EVENT_INTO_BIOVER', trace);
    },
    updatePoiStore({ commit }, poi) {
      commit('UPDATE_POI', poi);
    },
    importPois({ commit }, pois) {
      commit('IMPORT_POI', pois);
    },
    importPaths({ commit }, paths) {
      commit('IMPORT_PATH', paths);
    },
    updateImportPois({ commit }, pois) {
      commit('UPDATE_IMPORT_POIS', pois);
    },
    updateImportPaths({ commit }, paths) {
      commit('UPDATE_IMPORT_PATHS', paths);
    },
    uploadDone({ commit }) {
      commit('UPLOAD_DONE');
    },
    resetUpload({ commit }) {
      commit('RESET_UPLOAD');
    },
    resetPoisModification({ commit }) {
      commit('RESET_POI_MODIFICATION');
    },
    resetPathsModification({ commit }) {
      commit('RESET_PATH_MODIFICATION');
    },
    selectAllPois({ commit }) {
      commit('SELECT_ALL_POIS');
    },
    unselectAllPois({ commit }) {
      commit('UNSELECT_ALL_POIS');
    },
    selectAllPaths({ commit }) {
      commit('SELECT_ALL_PATHS');
    },
    unselectAllPaths({ commit }) {
      commit('UNSELECT_ALL_PATHS');
    },
    selectAllEvents({ commit }) {
      commit('SELECT_ALL_EVENTS');
    },
    unselectAllEvents({ commit }) {
      commit('UNSELECT_ALL_EVENTS');
    },
    selectAllTraces({ commit }) {
      commit('SELECT_ALL_TRACES');
    },
    unselectAllTraces({ commit }) {
      commit('UNSELECT_ALL_TRACES');
    },
    resetStore({ commit }) {
      commit('RESET_STORE');
    },
    filter({ commit }, filter) {
      commit('FILTER', filter);
    },
    copyPoi({ commit }, poi) {
      commit('COPY', {
        type: 'POI',
        element: poi,
      });
    },
    copyPath ({ commit }, path) {
      commit('COPY', {
        type: 'PATH',
        element: path,
      });
    },
  },
  getters: {
    getCurrentBioverId(state) {
      return state.currentBioversId;
    },
    getDisplayedBioversById: (state) => (id) => {
      const index = state.bioversToDisplay.findIndex((biover) => biover.biover.id === id);
      return state.bioversToDisplay[index]
    },
    getPoisByBiover: (state) => (id) => {
      const index = state.pois.findIndex((poi) => poi.bioverId === id);
      if (index === -1) {
        return [];
      }
      if (state.filter.length === 0) {
        return state.pois[index].pois;
      }
      return state.pois[index].pois.filter((poi) => (
        filterUtils.poiFilter(poi, state.filter)
      ));
    },
    getPathsByBiover: (state) => (id) => {
      const index = state.paths.findIndex((path) => path.bioverId === id);
      if (index === -1) {
        return [];
      }
      if (state.filter.length === 0) {
        return state.paths[index].paths;
      }
      return state.paths[index].paths.filter((path) => (
        filterUtils.pathFilter(path, state.filter)
      ));
    },
    getTraceByBiovers: (state) => (id) => {
      const index = state.traces.findIndex((trace) => trace.bioverId === id);
      if (index === -1) {
        return [];
      }
      return state.traces[index].traces;
    },
    getTraceByBioversAndUser: (state) => (id) => {
      const index = state.traces.findIndex((trace) => trace.bioverId === id);
      if (index === -1) {
        return [];
      }
      return state.traces[index].traces.filter((trace) => {
        return trace.element.User.username.toLocaleLowerCase() === username.value.toLocaleLowerCase();
      });
    },
    getEventByBiovers: (state) => (id) => {
      const index = state.events.findIndex((event) => event.bioverId === id);
      if (index === -1) {
        return [];
      }
      return state.events[index].events;
    },
    getEventByBioversAndUser: (state) => (id) => {
      const index = state.events.findIndex((event) => event.bioverId === id);
      if (index === -1) {
        return [];
      }
      return state.events[index].events.filter((event) => {
        return event.element.User.username.toLocaleLowerCase() === username.value.toLocaleLowerCase();
      });
    },
    getPois(state) {
      const poisToDisplay = [];
      state.pois.forEach((poi) => {
        poisToDisplay.push(...poi.pois
          .filter((element) => filterUtils.poiFilter(element, state.filter)));
      });
      return poisToDisplay;
    },
    getPaths(state) {
      const pathsToDisplay = [];
      state.paths.forEach((path) => {
        pathsToDisplay.push(...path.paths);
      });
      return pathsToDisplay;
    },
    ownOrPublic: (state) => (bioverId) => {
      const index = state.ownBiovers.findIndex((b) => b.id === bioverId);
      if (index === -1) {
        return 'public';
      }
      return 'own';
    },
    bioverIsEditable: (state) => (bioverId) => {
      const index = state.publicBiovers.findIndex((b) => b.id === bioverId);
      if (index === -1) {
        return true;
      }
      return state.publicBiovers[index].is_editable;
    },
    getCopyElement(state) {
      return state.copyElement;
    },
    getPoiColumnsPreference(state) {
      return state.poiColumnsPreference;
    },
    getPathColumnsPreference(state) {
      return state.pathColumnsPreference;
    },
    getTraceColumnsPreference(state) {
      return state.traceColumnsPreference;
    },
    getEventColumnsPreference(state) {
      return state.eventColumnsPreference;
    },
  },
};

export default bioversStore;
