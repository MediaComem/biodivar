import axios from 'axios';

const API = import.meta.env.VITE_API_ROOT;

export default {
  async savePaths(paths) {
    return axios.post(
      `${API}path/creates`,
      paths,
      { withCredentials: true },
    );
  },
};
