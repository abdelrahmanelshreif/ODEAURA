import axios from 'axios';
import queryString from 'query-string';
axios.defaults.withCredentials = true;

// Function to set the token in cookies or local storage
const setToken = (token) => {
  document.cookie = `login_token=${token}; path=/; Secure; SameSite=None; domain=odeaura.vercel.app `;

  
  // // Alternatively, use local storage
  // localStorage.setItem('token', token);
};


const baseUrl = 'https://odeaura-api.vercel.app';
// const baseUrl = 'http://localhost:3000';



const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
    if (token) {
    setToken(token);
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
