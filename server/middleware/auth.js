const jwt = require('jsonwebtoken')
const { User } = require('./../models/User')

// helper functions
const isTokenFound = (token) => {
  if (!token) throw Error('not authenticated')
}

// middlewares
const checkUser = async (req, res, next) => {
  const token = req.cookies.login_token;
  if (!token) {
    res.locals.user = null
    return next()
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    let user = await User.findById(id)
    delete user._doc.password

    res.locals.user = user
  } catch (err) {
    console.log(err.message)
    res.locals.user = null
  }
  next()
}

const isAuthenticated = (req, res, next) => {
  // const token = req.cookies.login_token;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ error: 'Not authenticated, token missing' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Optionally, you can attach the decoded token to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle different types of errors
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

const isAdmin = async (req, res, next) => {
  const token = req.cookies.login_token;
  try {
    isTokenFound(token)
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)
    if (isAdmin) {
      return next()
    } else {
      throw Error('not authorized')
    }
  } catch (err) {
    if (err.message === 'not authenticated') {
      return res.status(401).json({ error: 'not authenticated' })
    }
    if (err.message === 'not authorized') {
      return res.status(401).json({ error: 'not authorized' })
    }
    console.log('is admin err ::', err)
  }
  next()
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
module.exports = { isAuthenticated, checkUser, isAdmin ,restrictTo}
