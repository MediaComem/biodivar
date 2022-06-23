import bioversApi from '../api/biovers';
import filterUtils from '../utils/filters';

export const bioversStore = {
  namespaced: true,
  state() {
    return {
      index: 1,
      userPreference: [],
      ownBiovers: [],
      publicBiovers: [],
      addBioversInTab: false,
      bioversToDisplay: [],
      currentBioversId: -1,
      pois: [],
      poisModification: {},
      paths: [],
      pathsModification: {},
      uploadInProgress: false,
      uploadDone: false,
      filter: '',
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
    ADD_INTO_POI(state, poi) {
      const index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
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
    IMPORT_POI(state, pois) {
      const index = state.pois.findIndex((e) => e.bioverId === state.currentBioversId);
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
      const index = state.paths.findIndex((e) => e.bioverId === state.currentBioversId);
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
    RESET_STORE(state) {
      state.ownBiovers = [];
      state.publicBiovers = [];
      state.bioversToDisplay = [];
      state.currentBioversId = -1;
      state.pois = [];
      state.poisModification = {};
      state.paths = [];
      state.uploadInProgress = false;
      state.uploadDone = false;
    },
    FILTER(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    async getBiovers({ dispatch, commit, state }) {
      const ownerBiovers = await bioversApi.getBioversByUser();
      const publicB = await bioversApi.getPublicBiovers();
      const difference = publicB.data.data.filter(
        (x) => !ownerBiovers.data.data.some((present) => present.id === x.id),
      );
      commit('SAVE_OWNER_BIOVERS', ownerBiovers.data.data);
      commit('SAVE_PUBLIC_BIOVERS', difference);
      state.userPreference.forEach((pref) => {
        let bioverIndex = ownerBiovers.data.data.findIndex((biover) => biover.id === pref);
        if (bioverIndex !== -1) {
          const biover = ownerBiovers.data.data[bioverIndex];
          commit('SELECT_BIOVER', biover);
          dispatch('addPoiToDisplay', biover.id);
          dispatch('addPathToDisplay', biover.id);
        } else {
          bioverIndex = difference.findIndex((biover) => biover.id === pref);
          if (bioverIndex !== -1) {
            const biover = difference[bioverIndex];
            commit('SELECT_BIOVER', biover);
            dispatch('addPoiToDisplay', biover.id);
            dispatch('addPathToDisplay', biover.id);
          }
        }
      });
    },
    setCurrentBiover({ commit }, bioverId) {
      commit('SET_CURRENT_BIOVER', bioverId);
    },
    addNewBiover({ commit }, biover) {
      commit('ADD_NEW_BIOVER', biover);
    },
    addBioverToDisplay({ commit, state }, event) {
      let selectBiover = state.ownBiovers.find((e) => e.name === event.label);
      if (!selectBiover) {
        selectBiover = state.publicBiovers.find((e) => e.name === event.label);
      }
      commit('SELECT_BIOVER', selectBiover);
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
    addNewPoi({ commit }, poi) {
      commit('ADD_INTO_POI', poi);
      commit('ADD_POI_INTO_BIOVER', poi);
    },
    updatePoi({ commit }, poi) {
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
    resetStore({ commit }) {
      commit('RESET_STORE');
    },
    filter({ commit }, filter) {
      commit('FILTER', filter);
    },
  },
  getters: {
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
  },
};

export default bioversStore;
