import axios from 'axios';

export default {
  getMedia(media) {
    return `${process.env.VUE_APP_URL}/media/id?id=${media.id}`;
  },

  async save(media) {
    return axios.post(
      `${process.env.VUE_APP_URL}/media/create`,
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
