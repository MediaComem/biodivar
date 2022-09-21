import {fetchJson, postJson, postJsonBinary} from './fetch.js';

const API = import.meta.env.VITE_API_ROOT;

// Authentication part
export function isLogged() {
  return fetchJson(API + 'login');
}

export function login(username, password) {
  return postJson(API + 'login', {username, password});
}

export function register(username, email, password) {
  return postJson(API + 'register', {username, email, password});
}

export function resetEmail(email) {
  console.log(email);
  return true;
}

export function logout() {
  return fetchJson(API + 'logout');
}

// Biovers part
export function getBiovers() {
  return fetchJson(API + 'biovers');
}

export function getBioversByUser() {
  return fetchJson(API + 'biovers/user');
}

export function createBiover(biovers) {
  return postJson(API + 'biovers/create', biovers);
}

export function duplicateBiovers(biovers) {
  return postJson(API + 'biovers/duplicate', biovers);
}

export function updateBiovers(biovers) {
  return postJson(API + 'biovers/update', biovers)
}

export function deleteBiovers(biovers) {
  return postJson(API + 'biovers/delete', biovers);
}

// POIS part
export function savePoi(poi) {
  return postJson(API + 'poi/create', poi);
}

export function savePois(pois) {
  return postJson(API + 'poi/creates', pois);
}

export function updatePoi(poi) {
  return postJson(API + 'poi/update', poi);
}

export function deletePoi(poi) {
  return postJson(API + 'poi/delete', poi);
}

// Path part
export function savePaths(paths) {
  return postJson(API + 'path/creates', paths);
}

// Symbol part
export function getSymbolUrl(id) {
  return API + 'symbol_ar/id?id=' + id;
}
export function getIcon(symbol) {
  if (symbol && symbol.id) {
    return `${API}symbol/id?id=${symbol.id}`;
  }
  return `${API}symbol/id?id=0`;
}

export function saveSymbol(symbol) {
  return postJsonBinary(API + 'symbol/create', symbol, 'multipart/form-data');
}

// Media part
export function getMediaUrl(media) {
  return `${API}media/id?id=${media.id}`;
}

export function saveMedia(media) {
  return postJsonBinary(API + 'media/create', media, 'multipart/form-data');
}