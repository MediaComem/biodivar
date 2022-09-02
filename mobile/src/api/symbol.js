import axios from 'axios';

const API = import.meta.env.VITE_API_ROOT;

export default {
  getSymbol(symbol) {
    return `${API}symbol/id?id=${symbol.id}`;
  },

  getSymbolAr(symbol) {
    return `${API}symbol_ar/id?id=${symbol.id}`;
  },

  async save(symbol) {
    return axios.post(
      `${API}symbol/create`,
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
