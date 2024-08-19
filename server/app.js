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
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const { checkUser } = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();


const corsOptions = {
  origin: ['https://odeaura.vercel.app', 'http://localhost:5173'], // Allow frontend origins
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allow necessary methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','jwt','token','Origin'] // Allow necessary headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));





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

// Route handling
app.use(checkUser);
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use('/reviews',reviewRoutes);
app.use(wishlistRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app for serverless deployment
module.exports = app;