import axios from 'axios';

export default {
  async savePaths(paths) {
    return axios.post(
      `${process.env.VUE_APP_URL}/path/creates`,
      paths,
      { withCredentials: true },
    );
  },
};
