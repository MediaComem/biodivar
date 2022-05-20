const storeUser = (username) => { localStorage.setItem('username', username) };
const getUser = () => { return localStorage.getItem('username') };
const removeUser = () => { localStorage.removeItem('username') };

const storeFavori = (favori) => { localStorage.setItem('favori', favori)};
const getFavori = () => { 
  const favories = localStorage.getItem('favori');
  if (favories) return favories.split(',').map((str) => Number(str));
  return [];
};

export function storage() {

  return { storeUser, getUser, removeUser, storeFavori, getFavori };

}

