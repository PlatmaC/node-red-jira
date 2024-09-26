const axios = require("axios")
/**
 * @typedef {Object} Pagination
 * @property {number} page
 * @property {number} limit
 */

/**
 * @typedef {Object} Integration
 * @property {string} apiUrl
 * @property {string} apiKey
 */

/**
 * Make a get request with pagination
 * @param {Integration} integration
 * @param {string} url
 * @param {Object} queryObject
 * @param {Pagination} pagination
 * @return {Promise<{result: *[], total: number}>}
 */
async function apiGetPagination (integration, url, queryObject, pagination) {

  const fetchAll = !pagination.page
  let page = pagination.page || 1
  let limit = pagination.limit || 100
  let total = 0

  const queryString = new URLSearchParams(queryObject).toString();
  let hasMore = true
  let result = []
  while (hasMore) {
    const res = await axios(`${integration.apiUrl}${url}?${queryString}&limit=${limit}&page=${page}`, {
      method: 'GET',
      headers: {
        "Authorization": `token ${integration.apiKey}`,
        "Content-Type": "application/json",
      }
    })
    if (res.status!=200) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    result = result.concat(data)
    total = res.headers.get('x-total-count') ? parseInt(res.headers.get('x-total-count')) : 0
    hasMore = fetchAll && total > result.length
    page++
  }

  return { result, total }
}


async function apiGet (server, url, queryObject) {
  let fetchUrl = `${server.apiUrl}/rest/api/2/${url}`
  if (queryObject) {
    fetchUrl += `?${new URLSearchParams(queryObject).toString()}`
  }
  const res = await axios(fetchUrl, {
    method: 'GET',
    headers: {
      "Authorization": 'Basic ' + Buffer.from(server.apiEmail + ":" + server.apiKey).toString('base64'),
      "Content-Type": "application/json",
    }
  })
  if (res.status!=200) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return await res.data;
}


async function apiPut (server, url, queryData, bodyData) {

  let fetchUrl = `${server.apiUrl}/rest/api/2/${url}`
  if (queryData) {
    fetchUrl += `?${new URLSearchParams(queryData).toString()}`
  }
  const res = await axios(fetchUrl, {
    method: 'PUT',
    headers: {
      "Authorization": 'Basic ' + Buffer.from(server.apiEmail + ":" + server.apiKey).toString('base64'),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(bodyData)
  })
  if (res.status!=200) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return await res.data;
}

async function apiPost (server, url, queryData, bodyData) {

  let fetchUrl = `${server.apiUrl}/rest/api/2/${url}`
  if (queryData) {
    fetchUrl += `?${new URLSearchParams(queryData).toString()}`
  }

  const res = await axios(fetchUrl, {
    method: 'POST',
    headers: {
      "Authorization": 'Basic ' + Buffer.from(server.apiEmail + ":" + server.apiKey).toString('base64'),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(bodyData)
  })
  if (res.status!=201) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return await res.data;
}


module.exports = {
  apiGet,
  apiGetPagination,
  apiPut,
  apiPost
}
