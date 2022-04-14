export async function fetchJson(url) {
  let resp;
  let data;
  // silently return null if something wrong wit the fetch (timeout, cors, ...)
  try { resp = await fetch(url) } catch (e) { return null }
  // silently return null if the json is wrong
  try { data = await resp.json() } catch (e) { return null }
  return data;
}

export async function postJson(url, payload = null) {
  let resp;
  let data;
  try {
    resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (e) { return null }
  try { data = await resp.json() } catch (e) { return null }
  return data;
}