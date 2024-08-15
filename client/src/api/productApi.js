import axiosClient from './axiosClient'

const productApi = {
  getAllProducts: () => axiosClient.get('availableProducts'),
  getProductById: (id) => axiosClient.get(`products/${id}`),
  adminProduts: () => axiosClient.get('allProducts'),
  availabilityChange: (id, params) =>
    axiosClient.put(`products/update/${id}`, params),
  addProduct: (params) => axiosClient.post('products/add', params),
  editProduct: (id, params) => axiosClient.put(`products/update/${id}`, params),
  deleteProduct: (id) => axiosClient.delete(`products/delete/${id}`),
  catProducts: (id) => axiosClient.get(`categories/${id}`),
}

export default productApi

// import getToken from './AuthAPI'
// const baseUrl = 'https://odeaura-api.vercel.app/';

// const fetchWithAuth = async (url, options = {}) => {
//   const token = getToken();
//   if (token) {
//     options.headers = {
//       ...options.headers,
//       'Authorization': `Bearer ${token}`
//     };
//   }
//   const response = await fetch(`${baseUrl}${url}`, options);
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   return response.json();
// };

// const productAPI = {
//   getAllProducts: () => fetchWithAuth('availableProducts'),

//   getProductById: (id) => fetchWithAuth(`products/${id}`),

//   adminProducts: () => fetchWithAuth('allProducts'),

//   availabilityChange: (id, params) => fetchWithAuth(`products/update/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   }),

//   addProduct: (params) => fetchWithAuth('products/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   }),

//   editProduct: (id, params) => fetchWithAuth(`products/update/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   }),

//   deleteProduct: (id) => fetchWithAuth(`products/delete/${id}`, {
//     method: 'DELETE'
//   }),

//   catProducts: (id) => fetchWithAuth(`categories/${id}`),
// };

// export default productAPI;
