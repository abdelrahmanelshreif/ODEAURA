// import axios from 'axios';
// import queryString from 'query-string';
// axios.defaults.withCredentials = true;

// // Function to set the token in cookies or local storage
// const setToken = (token) => {
//   // Example using cookies
//   // document.cookie = `login_token=${token}; path=/; HttpOnly; Secure; SameSite=None`;
  
//   // // Alternatively, use local storage
//   localStorage.setItem('login_token', token);
// };


// const baseUrl = 'https://odeaura-api.vercel.app';
// // const baseUrl = 'http://localhost:3000/';



// const axiosClient = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     'content-type': 'application/json'
//   },
//   paramsSerializer: (params) => queryString.stringify(params),
// });


// axiosClient.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem('login_token');
//     if (token) {
//     setToken(token);
//   }
//   return config;
// });


// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (err) => {
//     if (!err.response) {
//       return err;
//     }
//     throw err.response;
//   }
// );
// export default axiosClient;
import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie'; // Use js-cookie or other library for cookies management


// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

const baseUrl = 'https://odeaura-api.vercel.app';
// const baseUrl = 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
    'Authorization':''
  },
  paramsSerializer: (params) => queryString.stringify(params),
});


axiosClient.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = Cookies.get('login_token');

  // If token exists, add it to the Authorization header
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors and responses
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    return Promise.reject(error.response);
  }
);

export default axiosClient;
