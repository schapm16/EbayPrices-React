import request from 'request-promise-native';

const configuredRequest = request.defaults({
  baseUrl: `${window.location.origin}`,
  json: true
})


export default {
  post: (path, body) => {
    return configuredRequest.post(path, {body})
  }
}