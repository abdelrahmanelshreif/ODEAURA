// import React, { createContext, useContext, useState } from 'react'

// const AuthContext = createContext()

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: '',
//   })
//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// const useAuth = () => useContext(AuthContext)

// export { AuthProvider, useAuth }


import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Use js-cookie or other library for cookies management

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: Cookies.get('login_token') || '', // Load token from cookies initially
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

