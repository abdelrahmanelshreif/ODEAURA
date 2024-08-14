const { handleLoginError } = require('../validators/loginValidators')
const { checkUniqueness } = require('../validators/signupValidators')
const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const maxAge = 24 * 60 * 60 // 1 day in msec

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    // create user
    const user = await User.create({ firstName, lastName, email, password })
    console.log(user._id)

    delete user._doc.password

    res.status(200).json(user)
  } catch (err) {
    const uniqueError = checkUniqueness(err)
    if (uniqueError) return res.status(400).json(uniqueError)

    console.log(`signup error: ${err}`)

    res.status(500).json({ message: 'Internal server error' })
  }
}

// const login = async (req, res) => {
//   const { email, password } = req.body
//   try {
//     // login
//     const user = await User.login(email, password)

//     // create token
//     const payload = { id: user._id, isAdmin: user.isAdmin }
//     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//       expiresIn: maxAge,
//     })

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: true, 
//       sameSite: 'None',
//       maxAge: maxAge * 1000,
//     })
//     delete user._doc.password

//     res.status(200).json(user)
//   } catch (err) {
//     const errors = handleLoginError(err)
//     if (Object.keys(errors).length > 0) return res.status(400).json(errors)

//     console.log(`login post error: ${err}`)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Authenticate user
    const user = await User.login(email, password); // Ensure this method checks hashed password

    // Create token
    const payload = { id: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    });

    // Optionally set the cookie (if you want to use cookies as well)
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure based on environment
      sameSite: 'None',
      maxAge: maxAge * 1000,
    });

    // Send the token in the JSON response
    delete user._doc.password; // Remove password before sending user data
    res.status(200).json({
      message: 'Login successful',
      token: token, // Include the token in the response
      user: user,   // Optionally include user data
    });
  } catch (err) {
    const errors = handleLoginError(err);
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    console.log(`login post error: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
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
