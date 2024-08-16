import axios from 'axios';
import queryString from 'query-string';
axios.defaults.withCredentials = true;

// Function to set the token in cookies or local storage
const setToken = (token) => {
  // Example using cookies
  document.cookie = `login_token=${token}; path=/; HttpOnly; Secure; SameSite=None`;

};


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = 'https://odeaura-api.vercel.app/';
// const baseUrl = 'http://localhost:3000/';



const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
  const token = getCookie('login_token');
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
