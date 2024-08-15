// import axiosClient from './axiosClient'

// const UserApi = {
//   UpdateMe: (params) => axiosClient.put('updateMe', params),
// }

// export default UserApi

import getToken from './AuthAPI'
const baseUrl = 'https://odeaura-api.vercel.app/';

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
  }
  const response = await fetch(`${baseUrl}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const userAPI = {
  updateMe: (params) => fetchWithAuth('updateMe', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }),
};

export default userAPI;
