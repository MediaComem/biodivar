import axios from 'axios';

export default {
  getSymbol(symbol) {
    if (symbol && symbol.id) {
      return `${process.env.VUE_APP_URL}/symbol/id?id=${symbol.id}`;
    }
    return '';
  },

  getSymbolAr(symbol) {
    return `${process.env.VUE_APP_URL}/symbol_ar/id?id=${symbol.id}`;
  },

  async save(symbol) {
    return axios.post(
      `${process.env.VUE_APP_URL}/symbol/create`,
      symbol,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
};
