import axios from 'axios';
import axiosRetry from 'axios-retry';

// ----------------------------------------------------------------------
// const BASE_URL1 = 'http://localhost:5055/';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:15000',
  // baseURL: 'https://omify-backend.vercel.app',
  timeout: 600000
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // localStorage.clear();
        window?.location?.refresh();
        // serviceWorkerRegistration.unregister();
      }
      return Promise.reject((error.response && error.response.data) || 'Something went wrong');
    }
    return Promise.reject(error);
  }
);

axiosRetry(axiosInstance, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) =>
    // if retry condition is not specified, by default idempotent requests are retried
    error.response.status === 502 ||
    error.response.status === 501 ||
    error.response.status === 500 ||
    error.response.status === 503
});

export default axiosInstance;
