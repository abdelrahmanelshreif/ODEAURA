// import axiosClient from './axiosClient'

// const authAPI = {
//   signup: (params) => axiosClient.post('signup', params),
//   login: (params) => axiosClient.post('login', params),
//   loginget: () => axiosClient.get('login'),
//   verifyUser: () => axiosClient.get('me'),
//   logout: () => axiosClient.post('logout'),
//   allUsers: () => axiosClient.get('users'),
//   deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
// }

// export default authAPI

// import axiosClient from './axiosClient';

// const authAPI = {
//   signup: (params) => axiosClient.post('signup', params),
//   login: ({ email, password }) => axiosClient.post(`login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
//   loginget: () => axiosClient.get('login'),
//   verifyUser: () => axiosClient.get('me'),
//   logout: () => axiosClient.post('logout'),
//   allUsers: () => axiosClient.get('users'),
//   deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
// };

// export default authAPI;

import axiosClient from './axiosClient';

const authAPI = {
  signup: (params) => axiosClient.post('signup', params),

  // Using fetch for login
  login: async ({ email, password }) => {
    try {
      // const response = await fetch('https://odeaura-api.vercel.app/login', {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://odeaura.vercel.app'
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
