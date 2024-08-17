import axiosClient from './axiosClient'

const productApi = {
  getAllProducts: () => axiosClient.get('availableProducts',{
    credentials:true
  }),
  getProductById: (id) => axiosClient.get(`products/${id}`,{
    credentials:true
  }),
  adminProduts: () => axiosClient.get('allProducts',{
    credentials:true
  }),
  availabilityChange: (id, params) =>
    axiosClient.put(`products/update/${id}`, params,{
      credentials:true
    }),
  addProduct: (params) => axiosClient.post('products/add', params,{
    credentials:true
  }),
  editProduct: (id, params) => axiosClient.put(`products/update/${id}`, params,{
    credentials:true
  }),
  deleteProduct: (id) => axiosClient.delete(`products/delete/${id}`,{
    credentials:true
  }),
  catProducts: (id) => axiosClient.get(`categories/${id}`,{
    credentials:true
  }),
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
