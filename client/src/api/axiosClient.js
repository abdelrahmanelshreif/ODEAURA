// import axios from 'axios'
// import queryString from 'query-string'
// axios.defaults.withCredentials = true

// // todo: Token from Cookies

// const baseUrl = 'https://odeaura-api.vercel.app/'

// const axiosClient = axios.create({
//   baseURL: baseUrl,
//   headers: () => ({
//     'content-type': 'application/json',
//     // Authorization: `Bearer ${getToken()}`,
//   }),
//   paramsSerializer: (params) => queryString.stringify(params),
// })

// axiosClient.interceptors.request.use(async (config) => {
//   return {
//     ...config,
//     headers: () => ({
//       'content-type': 'application/json',
//       // Authorization: `Bearer ${getToken()}`,
//     }),
//   }
// })

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data
//     }
//     return response
//   },
//   (err) => {
//     if (!err.response) {
//       return err
//     }
//     throw err.response
//   }
// )
// export default axiosClient

import axios from 'axios';
import queryString from 'query-string';
axios.defaults.withCredentials = true;


// Function to get token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return value;
    }
  }
  return null;
};

// const baseUrl = 'https://odeaura-api.vercel.app/';
const baseUrl = 'http://localhost:3000/';

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    if (!err.response) {
      return err;
    }
    throw err.response;
  }
);


export default axiosClient;
