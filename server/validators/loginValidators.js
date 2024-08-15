const Joi = require('joi')


//INPUT VALIDATION V:1.0.0 
const validateLoginInput = (req, res, next) => {
  const user = req.body

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const errors = {}
  const validationErrors = schema.validate(user, { abortEarly: false })

  if (!validationErrors.error) return next()

  const errorDetails = validationErrors.error.details
  errorDetails.forEach((detail) => {
    console.log(detail)
    errors[detail.path[0]] = detail.message.replace(/[\\"]/g, '')
  })

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }

  next()
}

//------------------------------------------------------
// Validation on URL PARAMS (LOGIN)
//------------------------------------------------------
// const validateLoginInput = (req, res, next) => {
//   // Extract email and password from URL query parameters
//   const { email, password } = req.query; // Correct extraction

//   // Define the validation schema
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });

//   // Validate the input
//   const { error } = schema.validate({ email, password });

//   if (error) {
//     // If validation fails, respond with a 400 status and validation error details
//     return res.status(400).json({
//       message: 'Invalid input',
//       details: error.details,
//     });
//   }

//   // If validation passes, proceed to the next middleware or route handler
//   next();
// };


const handleLoginError = (err) => {
  let errors = {
    email: '',
    password: '',
  };

  if (err.message === 'incorrect email') {
    errors.email = 'This email is not registered.';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'Incorrect password.';
  }

  return errors;
};


module.exports = { validateLoginInput, handleLoginError }