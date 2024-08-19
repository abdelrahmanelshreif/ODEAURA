import axiosClient from './axiosClient';

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
  // verifyUser: () => axiosClient.get('me'),
   verifyUser: () => axiosClient.get('me', {
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQ2Y2ZlNzIzNGU1OTRjNTdiNWQzMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjM4NTY0MTEsImV4cCI6MTcyMzk0MjgxMX0.M4EgAPEZEKFLrtnZCpR9lnTarxH7esg9BZ5xzIR_sGQ',
    }
  }),
  logout: () => axiosClient.post('logout'),
  allUsers: () => axiosClient.get('users'),
  deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
};

export default authAPI;