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

      // return await response.json();
      const data = await response.json();
      const token = data.token;

      // Store the token in localStorage
      localStorage.setItem('login_token', token);

      // Optionally set other user data in state or localStorage
      return data;
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