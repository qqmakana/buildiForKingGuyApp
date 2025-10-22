const express = require('../backend/dist/server.js');

// Export the Express app as a serverless function
module.exports = express.default || express;

