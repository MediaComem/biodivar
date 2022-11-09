export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
            currentTableOver: 0,
            currentTabClick: [],
            poiConfigPreferences: null,
        };
    },
    mutations: {
        UPDATE_WAIT(state, wait) {
            state.wait = wait;
        },
        UPDATE_OVER(state, id) {
            state.currentTableOver = id;
        },
        ADD_OR_REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            index === -1 ? state.currentTabClick.push(id) : state.currentTabClick.splice(index, 1);
        },
        REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            if (index !== -1) state.currentTabClick.splice(index, 1);
        },
        SAVE_POI_PREFERENCES(state, preferences) {
            state.poiConfigPreferences = preferences;
        }
    },
    actions: {
        updateWait({ commit }, wait) {
            commit('UPDATE_WAIT', wait);
        },
        updateOver({ commit }, id) {
            commit('UPDATE_OVER', id);
        },
        addOrRemoveClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_CLICK', id);
        },
        removeClickElement({ commit }, id) {
            commit('REMOVE_CLICK', id);
        },
        savePoiPreferences({ commit }, preferences) {
            commit('SAVE_POI_PREFERENCES', preferences);
        },
    },
    getters: {
        getcurrentTableOver(state) {
            return state.currentTableOver;
        },
        getCurrentTabClick(state) {
            return state.currentTabClick;
        },
        getPoiConfigPreferences(state) {
            return state.poiConfigPreferences;
        }
    },
}