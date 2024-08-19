// import axiosClient from './axiosClient';

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
//           'Origin': 'https://odeaura.vercel.app'
//           // 'Origin': 'http://localhost:3000' 
//         },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include' // Important to include cookies

//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // return await response.json();
//       const data = await response.json();
//       const token = data.token;

//       // Store the token in localStorage
//       localStorage.setItem('login_token', token);

//       // Optionally set other user data in state or localStorage
//       return data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },

//   loginget: () => axiosClient.get('login'),
//   verifyUser: () => axiosClient.get('me'),
//   logout: () => axiosClient.post('logout'),
//   allUsers: () => axiosClient.get('users'),
//   deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
// };

// export default authAPI;
import axiosClient from './axiosClient';

// Function to set token in cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
};

const authAPI = {
  signup: (params) => axiosClient.post('signup', params),
  login: async ({ email, password }) => {
    try {
      const response = await fetch('https://odeaura-api.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://odeaura.vercel.app', // Set the origin for CORS
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important to include cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.token;

      // Set the token as a cookie
      setCookie('login_token', token, 7); // Cookie expires in 7 days

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
