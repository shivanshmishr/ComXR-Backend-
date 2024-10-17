const express = require("express");
const cluster = require('cluster');

// Initialize Express App
const app = express();

// Logging Middleware
// Define custom Morgan token for cluster worker ID
const morgan = require("morgan");
morgan.token('worker', () => {
    if (cluster.isWorker) {
        return cluster.worker.id;
    }
    return 'N/A';
});

// Use Morgan middleware with the custom token
app.use(morgan('\x1b[36m:worker\x1b[0m \x1b[34m:method\x1b[0m \x1b[33m:url\x1b[0m \x1b[32m:status\x1b[0m :response-time ms'));

// Body Parser Setup
// Remove Body Size Limit
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '2gb' }));
app.use(bodyParser.urlencoded({ limit: '2gb', extended: true }));

// CORS Config
const cors = require("cors");
app.use(cors());


// Main Route Setup
// v1 API Routes
app.use('/api/v1', require('./src/routes/v1'));
app.get("/", (req, res) => res.status(200).send("Hello world"))

// Error Handler
const errorHandler = require("./src/middleware/errorHandler");
app.use(errorHandler);

module.exports = {
    app,
}