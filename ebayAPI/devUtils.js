const URL = require ('url-parse');

exports.logRequests = function(request) {
  require('request-debug')(request, (type, data) => {
    if (type === 'request') {
      data.uri = new URL(data.uri, true);
      delete data.uri.href;
      console.log(data);
    }
  });
}