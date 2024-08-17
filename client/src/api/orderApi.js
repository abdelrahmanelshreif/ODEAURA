import axiosClient from './axiosClient'

const orderApi = {
  addOrder: (params) => axiosClient.post('orders/add', params,{
    credentials:true
  }),
  getMyOrders: () => axiosClient.get('myorders',{
    credentials:true
  }),
  getAllOrders: () => axiosClient.get('orders',{
    credentials:true
  }),
  deleteOrder: (id) => axiosClient.delete(`orders/delete/${id}`,{
    credentials:true
  }),
}

export default orderApi


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

// const orderAPI = {
//   addOrder: (params) => fetchWithAuth('orders/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   }),

//   getMyOrders: () => fetchWithAuth('myorders'),

//   getAllOrders: () => fetchWithAuth('orders'),

//   deleteOrder: (id) => fetchWithAuth(`orders/delete/${id}`, {
//     method: 'DELETE'
//   }),
// };

// export default orderAPI;
