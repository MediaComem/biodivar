import {fetchJson, postJson} from './fetch.js';

const API = import.meta.env.VITE_API_ROOT;

export function getBiovers() {
  return fetchJson(API + 'biovers');
}

export function login(username, password) {
  return postJson(API + 'login', {username, password});
}