import axios from 'axios';
import queryString from 'query-string';
axios.defaults.withCredentials = true;


// Function to get the token from cookies or local storage
const getToken = () => {
  // Example using cookies
  const matches = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (matches) return matches[2];
};



// Function to set the token in cookies or local storage
const setToken = (token) => {
  // Example using cookies
  document.cookie = `jwt=${token}; path=/; HttpOnly; Secure; SameSite=None`;
  
  // Alternatively, use local storage
  // localStorage.setItem('token', token);
};
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
  const token = getToken();
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
export default (axiosClient,getToken);
