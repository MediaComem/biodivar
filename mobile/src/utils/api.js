import {fetchJson, postJson} from './fetch.js';

const API = import.meta.env.VITE_API_ROOT;

export function getBiovers() {
  return fetchJson(API + 'biovers');
}

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

export function duplicateBiovers(biovers) {
  return postJson(API + 'biovers/duplicate', biovers);
}

export function updateBiovers(biovers) {
  return postJson(API + 'biovers/update', biovers)
}

export function deleteBiovers(biovers) {
  return postJson(API + 'biovers/delete', biovers);
}

export function getSymbolUrl(id) {
  return API + 'symbol_ar/id?id=' + id;
}