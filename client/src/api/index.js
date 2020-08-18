import * as axios from 'axios';

const configuredRequest = axios.create({
  method: 'GET',
  baseURL: `${window.location.origin}`
})


export default {
  get: (path, query) => {
    return configuredRequest
            .get(path, {params: query})
            .then(response => response.data)
  }
}