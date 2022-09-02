import axios from 'axios';

const API = import.meta.env.VITE_API_ROOT;

export default {
  getMedia(media) {
    return `${API}media/id?id=${media.id}`;
  },

  async save(media) {
    return axios.post(
      `${API}media/create`,
      media,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
};
