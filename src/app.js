const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');

const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const allowedOrigins = [
    'https://impactinglife.sdssoftltd.co.uk/',
    'https://impactinglifeuat.sdssoftltd.co.uk/',
    'http://localhost:3000/',
    'http://localhost:5173/'
];

// Middleware
// app.use(cors());
app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', routes);
app.use('/api/v1', routes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // ✅ Swagger
app.use((req, res, next) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred'
    });
});

module.exports = app;
