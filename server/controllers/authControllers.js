const { handleLoginError } = require('../validators/loginValidators')
const { checkUniqueness } = require('../validators/signupValidators')
const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const maxAge = 24 * 60 * 60 // 1 day in msec

const signToken = (user) => {
  const payload = { id: user._id, isAdmin: user.isAdmin };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: maxAge
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  const cookieOptions = {
    expires: new Date(
      Date.now() + maxAge * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  // it hide the password from the output
  user.password = undefined;
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photo: user.photo, // Include photo
    shippingAddress: user.shippingAddress, // Include shippingAddress
    isAdmin: user.isAdmin, // Include isAdmin
    createdAt: user.createdAt // Include createdAt
  });
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    // create user
    const user = await User.create({ firstName, lastName, email, password })
    console.log(user._id)

    delete user._doc.password

    createSendToken(user, 200, res);
  } catch (err) {
    const uniqueError = checkUniqueness(err)
    if (uniqueError) return res.status(400).json(uniqueError)

    console.log(`signup error: ${err}`)

    res.status(500).json({ message: 'Internal server error' })
  }
}

const login = async (req, res) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  
    const { email, password } = req.body;
  //  1) Check if email and password exist
  if (!email || !password) {
    return next();
  }
  //  2) Check if email and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password ', 401));
  }
  // 3) If everything is Ok send token to client
  createSendToken(user, 200, res);
  
};

const logout = (req, res) => {
  try {
    res.clearCookie('jwt', { sameSite: 'None', secure: true })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to logout' })
  }
}
module.exports = { signup, login, logout }