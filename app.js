// This file separates express.js declarations and routes from the server.js file in order to allow testing to operate
// Otherwise it causes jest to hang indefinitely
const express = require('express');

const app = express();

// Bind public page routes
app.use(express.static('public'));


module.exports = app;