import axios from 'axios';

export default {
  async savePoi(poi) {
    return axios.post(
      `${process.env.VUE_APP_URL}/poi/create`,
      poi,
      { withCredentials: true },
    );
  },

  async updatePoi(poi) {
    return axios.post(
      `${process.env.VUE_APP_URL}/poi/update`,
      poi,
      { withCredentials: true },
    );
  },
};
