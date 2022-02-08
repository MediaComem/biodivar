import axios from 'axios';

export default {
  async getBioversByUser(id) {
    return axios.get(`${process.env.VUE_APP_URL}/biovers/user?id=${id}`, { withCredentials: true });
  },

  async getPublicBiovers() {
    return axios.get(`${process.env.VUE_APP_URL}/biovers`, { withCredentials: true });
  },
};
