// const jwt = require('jsonwebtoken')
// const { User } = require('./../models/User')

// // helper functions
// const isTokenFound = (token) => {
//   if (!token) throw Error('not authenticated')
// }

// // middlewares
// const checkUser = async (req, res, next) => {
//   const token = req.cookies.login_token;
//   if (!token) {
//     res.locals.user = null
//     return next()
//   }

//   try {
//     const { id } = jwt.verify(token, process.env.SECRET_KEY)

//     let user = await User.findById(id)
//     delete user._doc.password

//     res.locals.user = user
//   } catch (err) {
//     console.log(err.message)
//     res.locals.user = null
//   }
//   next()
// }

// const isAuthenticated = (req, res, next) => {
//   // const token = req.cookies.login_token;
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];


//   if (!token) {
//     return res.status(401).json({ error: 'Not authenticated, token missing' });
//   }

//   try {
//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

//     // Optionally, you can attach the decoded token to the request object
//     req.user = decodedToken;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (err) {
//     // Handle different types of errors
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token expired' });
//     } else if (err.name === 'JsonWebTokenError') {
//       return res.status(401).json({ error: 'Invalid token' });
//     } else {
//       console.log('isAuthenticated error:', err);
//       return res.status(401).json({ error: 'Authentication error' });
//     }
//   }
// };

// const isAdmin = async (req, res, next) => {
//   const token = req.cookies.login_token;
//   try {
//     isTokenFound(token)
//     const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)
//     if (isAdmin) {
//       return next()
//     } else {
//       throw Error('not authorized')
//     }
//   } catch (err) {
//     if (err.message === 'not authenticated') {
//       return res.status(401).json({ error: 'not authenticated' })
//     }
//     if (err.message === 'not authorized') {
//       return res.status(401).json({ error: 'not authorized' })
//     }
//     console.log('is admin err ::', err)
//   }
//   next()
// }

// const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     // roles ['admin', 'lead-guide']. role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action', 403)
//       );
//     }

//     next();
//   };
// };
// module.exports = { isAuthenticated, checkUser, isAdmin ,restrictTo}
const jwt = require('jsonwebtoken');
const { User } = require('./../models/User');

// Helper function to check if token is found
const isTokenFound = (token) => {
  if (!token) throw new Error('Token not found');
};

// Middleware to check user based on Bearer token in header
const checkUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    let user = await User.findById(id);
    if (user) {
      delete user._doc.password; // Remove password from user object
      res.locals.user = user;
    } else {
      res.locals.user = null;
    }
  } catch (err) {
    console.log('checkUser error:', err.message);
    res.locals.user = null;
  }
  next();
};

// Middleware to check if request is authenticated based on Bearer token
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated, token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      console.log('isAuthenticated error:', err);
      return res.status(401).json({ error: 'Authentication error' });
    }
  }
};

// Middleware to check if user is an admin based on Bearer token
const isAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  try {
    isTokenFound(token);
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY);
    if (isAdmin) {
      return next();
    } else {
      return res.status(403).json({ error: 'Not authorized' });
    }
  } catch (err) {
    console.log('isAdmin error:', err.message);
    return res.status(401).json({ error: 'Authentication error' });
  }
};

// Middleware to restrict access to certain roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

module.exports = { isAuthenticated, checkUser, isAdmin, restrictTo };
