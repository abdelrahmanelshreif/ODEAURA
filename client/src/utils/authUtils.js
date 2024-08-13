// import authAPI from '../api/AuthAPI'
// const authUtils = {
//   isAuthenticated: async () => {
//     try {
//       const res = await authAPI.verifyUser()
//       return res.data.data
//     } catch (err) {
//       return false
//     }
//   },
// }

// export default authUtils

import authAPI from '../api/AuthAPI';

const authUtils = {
  isAuthenticated: async () => {
    try {
      // Attempt to verify the user's authentication status
      const res = await authAPI.verifyUser();

      // If successful, return the authentication data
      return res.data.data; // Ensure this matches your API's response structure
    } catch (err) {
      // If an error occurs, return false indicating the user is not authenticated
      return false;
    }
  },
};

export default authUtils;
