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

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    // login
    const user = await User.login(email, password)

    // create token
    const payload = { id: user._id, isAdmin: user.isAdmin }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true, // Ensure HTTPS
      sameSite: 'None' // Required for cross-site requests
    })
    delete user._doc.password

    res.status(200).json(user)
  } catch (err) {
    const errors = handleLoginError(err)
    if (Object.keys(errors).length > 0) return res.status(400).json(errors)

    console.log(`login post error: ${err}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}


//------------------------------------------------------
// login wit URL PARAMS
//------------------------------------------------------
// const login = async (req, res) => {
//   // Extract email and password from URL query parameters
//   console.log(req.query);
//   const { email, password } = req.query;
  
//   try {
//     // Attempt to log in the user
//     const user = await User.login(email, password);

//     // Create JWT payload and sign the token
//     const payload = { id: user._id, isAdmin: user.isAdmin };
//     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//       expiresIn: maxAge, // Ensure maxAge is defined
//     });

//     // Set the JWT as an HTTP-only cookie
//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Secure cookie in production
//       sameSite: 'None', // Adjust 'SameSite' if necessary
//       maxAge: maxAge * 1000,
//     });

//     // Remove the password from the user object before sending it back
//     delete user._doc.password;

//     // Send the user object as a response
//     res.status(200).json(user);
//   } catch (err) {
//     // Handle login errors
//     const errors = handleLoginError(err);
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json(errors);
//     }

//     // Log the error and return a generic server error message
//     console.error(`Login error: ${err}`);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



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
