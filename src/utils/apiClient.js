import axios from "axios";

export function createClient(options = {}) {
  const params = {
    timeout: 30000,
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    },
    ...options,
  };

  if (options && options.token) {
    params.headers = {
      Authorization: options.token,
    };
  }

  const instance = axios.create(params);

  return instance;
}
