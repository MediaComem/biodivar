import axios from 'axios';

const API = import.meta.env.VITE_API_ROOT;

export default {
  async getBioversByUser() {
    return axios.get(`${API}biovers/user`, { withCredentials: true });
  },

  async getPublicBiovers() {
    return axios.get(`${API}biovers`, { withCredentials: true });
  },

  async createBiover(biover) {
    return axios.post(`${API}biovers/create`, biover, { withCredentials: true });
  },
};
