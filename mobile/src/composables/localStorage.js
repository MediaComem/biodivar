const storeUser = (username) => { localStorage.setItem('username', username) };
const getUser = () => { return localStorage.getItem('username') };
const removeUser = () => { localStorage.removeItem('username') };

const storeFavori = (favori) => { localStorage.setItem('favori', favori)};
const getFavori = () => { 
  const favories = localStorage.getItem('favori');
  if (favories) return favories.split(',').map((str) => Number(str));
  return [];
};

const storePins = (pins) => { localStorage.setItem('pins', pins)};
const getPins = () => { 
  const pins = localStorage.getItem('pins');
  if (pins) return pins.split(',').map((str) => Number(str));
  return [];
};

const storeMinDistance = (distance) => { localStorage.setItem('minDistance', distance) };
const getMinDistance = () => {
  const distance = localStorage.getItem('minDistance');
  return distance ? distance : 2;
}

export function storage() {

  return { storeUser, getUser, removeUser, storeFavori, getFavori, storePins, getPins, storeMinDistance, getMinDistance };

}

