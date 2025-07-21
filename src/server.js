'use strict';

require('dotenv').config();
require('module-alias/register');

const app = require('./app');

const PORT = process.env.PORT;
if (!PORT) {
    console.error('❌ PORT environment variable is not set.');
    process.exit(1);
}

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    server.close(() => process.exit(1));
});
