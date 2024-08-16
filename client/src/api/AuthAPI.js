// import axiosClient from './axiosClient';

import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://odeaura-api.vercel.app',
  withCredentials: true, // This enables sending cookies with requests
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  const token = getCookie('login_token');
  if (token) {
    // Assuming setToken is a function that sets the Authorization header or similar
    config.headers['Authorization'] = `Bearer ${token}`; // Set the token in the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}



const authAPI = {
  signup: (params) => axiosClient.post('signup', params),
  login: async ({ email, password }) => {
    try {
      const response = await fetch('https://odeaura-api.vercel.app/login', {
      // const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://odeaura.vercel.app'
          // 'Origin': 'http://localhost:3000' 
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Important to include cookies

      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  loginget: () => axiosClient.get('login'),
  verifyUser: () => axiosClient.get('me'),
  logout: () => axiosClient.post('logout'),
  allUsers: () => axiosClient.get('users'),
  deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
};

export default authAPI;


//-------------------------------------------------------------------
// GET TOKEN FROM COOKIES TEST 
//-------------------------------------------------------------------

// import axiosClient from './axiosClient';

// // Function to get the token from cookies or local storage
const getToken = () => {
  // Example using cookies
  const matches = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (matches) return matches[2];
  
  // Alternatively, use local storage
  // return localStorage.getItem('token');
};

// Function to set the token in cookies or local storage
// const setToken = (token) => {
//   // Example using cookies
//   document.cookie = `jwt=${token}; path=/; HttpOnly; Secure; SameSite=None`;
  
//   // Alternatively, use local storage
//   // localStorage.setItem('token', token);
// };

// const authAPI = {
//   signup: (params) => axiosClient.post('signup', params),

//   login: async ({ email, password }) => {
//     try {
//       const response = await fetch('https://odeaura-api.vercel.app/login', {
//       // const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json, text/plain, */*',
//           'Origin': 'https://odeaura.vercel.app',
//           // 'Origin': 'http://localhost:5173',
//         },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include', // Important to include cookies
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       // Assuming token is returned in the response body
//       if (data.token) {
//         setToken(data.token); // Set the token for future requests
//       }

//       return data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },

//   loginget: () => axiosClient.get('login', {
//     headers: {
//       'Authorization': `Bearer ${getToken()}`,
//     }
//   }),

//   verifyUser: () => axiosClient.get('me', {
//     headers: {
//       'Authorization': `Bearer ${getToken()}`,
//     }
//   }),

//   logout: () => axiosClient.post('logout', {}, {
//     headers: {
//       'Authorization': `Bearer ${getToken()}`,
//     }
//   }),

//   allUsers: () => axiosClient.get('users', {
//     headers: {
//       'Authorization': `Bearer ${getToken()}`,
//     }
//   }),

//   deleteUser: (id) => axiosClient.delete(`users/remove/${id}`, {
//     headers: {
//       'Authorization': `Bearer ${getToken()}`,
//     }
//   }),
// };

// export default authAPI;

