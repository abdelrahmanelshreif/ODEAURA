// import axiosClient from './axiosClient'

// const catApi = {
//   allCat: () => axiosClient.get('categories'),
//   editCat: (id, params) => axiosClient.put(`categories/update/${id}`, params),
//   deleteCat: (id) => axiosClient.delete(`categories/delete/${id}`),
//   addCat: (params) => axiosClient.post('categories/add', params),
// }

// export default catApi

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

const catAPI = {
  allCat: () => fetchWithAuth('categories'),

  editCat: (id, params) => fetchWithAuth(`categories/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }),

  deleteCat: (id) => fetchWithAuth(`categories/delete/${id}`, {
    method: 'DELETE'
  }),

  addCat: (params) => fetchWithAuth('categories/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }),
};

export default catAPI;
