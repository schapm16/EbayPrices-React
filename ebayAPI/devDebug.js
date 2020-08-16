exports.logAxiosRequest = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('----Request----');
      console.dir(config);
      console.log('----------------');
      return config;
    },
    (error) => {
      console.log('----Request Error----');
      console.dir(error);
      console.log('---------------------');
      return Promise.reject(error);
    }
  )
}

exports.logAxiosResponse = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('----Response----');
      console.dir(response);
      console.log('----------------');
      return response;
    },
    (error) => {
      console.log('----Response Error----');
      console.dir(error);
      console.log('---------------------');
      return Promise.reject(error);
    }
  )
}