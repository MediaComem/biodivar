import axios from 'axios';

const API = import.meta.env.VITE_API_ROOT;

export default {
  async savePoi(poi) {
    return axios.post(
      `${API}poi/create`,
      poi,
      { withCredentials: true },
    );
  },

  async savePois(pois) {
    return axios.post(
      `${API}poi/creates`,
      pois,
      { withCredentials: true },
    );
  },

  async updatePoi(poi) {
    return axios.post(
      `${API}poi/update`,
      poi,
      { withCredentials: true },
    );
  },
};
