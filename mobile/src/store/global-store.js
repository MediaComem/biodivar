export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
        };
    },
    mutations: {
        UPDATE_WAIT(state, wait) {
            state.wait = wait;
        }
    },
    actions: {
        updateWait({ commit }, wait) {
            commit('UPDATE_WAIT', wait);
        },
    },
}