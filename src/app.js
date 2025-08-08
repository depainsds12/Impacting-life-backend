const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');

const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const corsOptions = {
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', routes);
// app.use('/api/v1', routes);
// app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // ✅ Swagger
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
