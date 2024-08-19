import axiosClient from './axiosClient';

// Function to set token in cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=None; Secure`;
};

const removeCookie = (cookieName) => {
  // Setting the cookie with an expired date to remove it
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; sameSite=None; secure`;
};

const authAPI = {
  // signup: (params) => axiosClient.post('signup', params),
   signup = async (params) => {
    try {
      const response = await fetch('https://odeaura-api.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://odeaura.vercel.app', // Set the origin for CORS
        },
        body: JSON.stringify(params),
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
      console.error('Signup error:', error);
      throw error;
    }
  };
  
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
  logout: async () => {
    try {
      await axiosClient.post('logout');

      // Clear the token from localStorage
      localStorage.removeItem('login_token');

      // Remove the cookie from the browser
      removeCookie('login_token');

      // Optionally, you can handle any additional logic after logout
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  allUsers: () => axiosClient.get('users'),
  deleteUser: (id) => axiosClient.delete(`users/remove/${id}`),
};

export default authAPI;
