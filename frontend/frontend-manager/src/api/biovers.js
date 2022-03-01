import axios from 'axios';

export default {
  async getBioversByUser(id) {
    return axios.get(`${process.env.VUE_APP_URL}/biovers/user?id=${id}`, { withCredentials: true });
  },

  async getPublicBiovers() {
    return axios.get(`${process.env.VUE_APP_URL}/biovers`, { withCredentials: true });
  },

  async createBiover(biover) {
    return axios.post(`${process.env.VUE_APP_URL}/biovers/create`, biover, { withCredentials: true });
  },
};
