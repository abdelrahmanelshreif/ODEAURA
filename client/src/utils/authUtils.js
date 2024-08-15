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
      const res = await authAPI.verifyUser();
      return res.data; // Assuming res.data holds the necessary user data
    } catch (err) {
      console.error("Authentication check failed:", err); // Log the error for debugging
      return null; // Return null instead of false for consistency
    }
  },
};

export default authUtils;
