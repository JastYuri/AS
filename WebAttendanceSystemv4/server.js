const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const session = require('express-session');

// Load environment variables from .env file
dotenv.config({ path: './.env' });
const server = express();

// Use a MySQL connection pool instead of a single connection
const db = mysql.createPool({
    host: process.env.DATABASE_host,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_password,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Max number of connections
    queueLimit: 0
});

// Promisify the db.query method for async/await
const promisePool = db.promise();
module.exports = promisePool; // Export the pool for use in other files

// Middleware to handle session management
server.use(session({
    secret: '072203', // Secret key for session encryption, change to a secure key
    resave: false, // Don't save session if it hasn't been modified
    saveUninitialized: true, // Save a session even if it's new
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve static files from the "public" directory
const publicDirectory = path.join(__dirname, './public');
server.use(express.static(publicDirectory));
server.use(express.json()); // Allow the server to parse JSON data
server.set('view engine', 'hbs'); // Set Handlebars (hbs) as the template engine

// Log when the pool creates a connection
db.on('connection', () => {
    console.log("A new connection has been created in the pool.");
});

// Test the database connection
(async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log("Connected to MySQL database.");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
})();

// Set up routing after the middleware
server.use('/node_modules', express.static('node_modules')); // Serve node_modules as static files
server.use('/', require('./route/pages')); // Use routes defined in pages.js
server.use('/uploads', require('./route/uploadroutes')); // Ensure the uploadroutes.js path is correct

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server started at port 3000");
});
