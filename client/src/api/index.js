import request from 'request-promise-native';

const configuredRequest = request.defaults({
  baseUrl: `${window.location.origin}`,
  json: true
})


export default {
  get: (path, query) => {
    return configuredRequest.get(path, {qs: query})
  }
}