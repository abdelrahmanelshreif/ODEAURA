// // const express = require('express')
// // const mongoose = require('mongoose')
// // const authRoutes = require('./routes/authRoutes')
// // const cookieParser = require('cookie-parser')
// // const userRoutes = require('./routes/userRoutes')
// // const productRoutes = require('./routes/productRoutes')
// // const cartRoutes = require('./routes/cartRoutes')
// // const orderRoutes = require('./routes/orderRoutes')
// // const categoryRoutes = require('./routes/categoryRoutes')
// // const wishlistRoutes = require('./routes/wishlistRoutes')
// // const { Router } = require('express')
// // const router = Router()

// // const stripe = require('stripe')(process.env.STRIPE_SECRET)
// // const { checkUser } = require('./middleware/auth')
// // const cors = require('cors')
// // require('dotenv').config()

// // const app = express()

// // // middlewares

// // app.use(
// //   cors());
// // app.use(express.json()) // parse incoming requests with JSON payloads
// // app.use(cookieParser())

// // // environment variables
// // const port = process.env.PORT || 3000
// // const dbURI =
// //   'mongodb+srv://abdelrahman93955:css@cluster0.en4bwyr.mongodb.net/ODEAURA'

// // // Connecting to db
// // mongoose
// //   .connect(dbURI)
// //   .then(() => {
// //     console.log('Connected to MongoDB!')
// //     app.listen(port, () => {
// //       console.log(`Server listening on port ${port}`)
// //     })
// //   })
// //   .catch((err) => {
// //     console.error(`Error connecting to MongoDB: ${err}`)
// //   })

// // app.all('*', checkUser) // to get access to user info in all views

// // app.use(authRoutes)
// // app.use(userRoutes)
// // app.use(categoryRoutes)
// // app.use(productRoutes)
// // app.use(cartRoutes)
// // app.use(orderRoutes)
// // app.use(wishlistRoutes)

// const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const authRoutes = require('./routes/authRoutes');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');
// const { checkUser } = require('./middleware/auth');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middlewares
// app.use(cors({
//   origin: '', // or '*' to allow all origins
//   credentials: true, // Allow cookies to be sent with requests
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
// }));
// // Enable CORS for all origins
// app.use(express.json());
// app.use(cookieParser());
// // Environment variables
// const port = process.env.PORT || 3000;
// const dbURI = process.env.DB_URI || 'your_fallback_dbURI';

// // Connecting to DB
// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB!');
//     app.listen(port, () => {
//       console.log(`Server listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(`Error connecting to MongoDB: ${err}`);
//   });


// app.get("/",(req,res)=>{
//   res.json("Hello");
// })
// // Apply middleware to all routes
// app.use(checkUser);

// // Route handling
// app.use(authRoutes);
// app.use(userRoutes);
// app.use(categoryRoutes);
// app.use(productRoutes);
// app.use(cartRoutes);
// app.use(orderRoutes);
// app.use(wishlistRoutes);

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const { checkUser } = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
const corsOptions = {
  origin: ['https://odeaura.vercel.app', 'http://localhost:5173'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',       // To allow content type header
    'Authorization',      // To allow the JWT token in the Authorization header
    'Accept',             // To allow specifying acceptable content types
    'Accept-Encoding',    // To allow specifying acceptable content encodings
    'Connection'          // To allow managing the connection type
  ],
  preflightContinue: true,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
};

app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Response Headers:', res.getHeaders());
  next();
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Security middleware

// Environment variables
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI || 'mongodb+srv://abdelrahman93955:css@cluster0.en4bwyr.mongodb.net/ODEAURA';

// Connecting to DB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit if there is a connection error
  });

// Simple route to check if server is running
app.get("/", (req, res) => {
  res.json("Hello");
});

// Apply middleware to all routes
app.use(checkUser);

// Route handling
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app for serverless deployment
module.exports = app;