const { handleLoginError } = require('../validators/loginValidators')
const { checkUniqueness } = require('../validators/signupValidators')
const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')

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

  // Basic validation for email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Attempt to login the user
    const user = await User.login(email, password);

    // Create the JWT token
    const payload = { id: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    });

    // Set the cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      // Secure: process.env.NODE_ENV === 'production', // Uncomment if using HTTPS
    });

    // Remove password from the response
    delete user._doc.password;

    // Send user data in response
    res.status(200).json(user);
  } catch (err) {
    // Handle different types of errors
    const errors = handleLoginError(err);

    // If there are validation errors, respond with 400
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Log the error and respond with 500
    console.error(`Login post error: ${err}`);
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
