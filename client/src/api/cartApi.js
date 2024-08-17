import axiosClient from './axiosClient'

const cartApi = {
  getMyCart: () => axiosClient.get('cart',{
    credentials:true
  }),
  addProduct: (id) => axiosClient.post(`cart/add/${id}`,{
    credentials:true
  }),
  incPrdocutQuantity: (id) => axiosClient.put(`cart/inc/${id}`,{
    credentials:true
  }),
  decPrdocutQuantity: (id) => axiosClient.put(`cart/dec/${id}`,{
    credentials:true
  }),
  deleteProduct: (id) => axiosClient.delete(`cart/delete/${id}`,{
    credentials:true
  }),
}

export default cartApi

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

// const cartAPI = {
//   getMyCart: () => fetchWithAuth('cart'),

//   addProduct: (id) => fetchWithAuth(`cart/add/${id}`, {
//     method: 'POST'
//   }),

//   incProductQuantity: (id) => fetchWithAuth(`cart/inc/${id}`, {
//     method: 'PUT'
//   }),

//   decProductQuantity: (id) => fetchWithAuth(`cart/dec/${id}`, {
//     method: 'PUT'
//   }),

//   deleteProduct: (id) => fetchWithAuth(`cart/delete/${id}`, {
//     method: 'DELETE'
//   }),
// };

// export default cartAPI;
