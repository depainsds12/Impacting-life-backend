const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// Allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://impactinglifeuat.sdssoftltd.co.uk",
    "https://impactinglife.sdssoftltd.co.uk"
];

// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow server-to-server, Postman, curl, etc.
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy does not allow this origin"), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', routes);
// Swagger Docs
// app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred'
    });
});

module.exports = app;
