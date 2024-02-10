// This file separates express.js declarations and routes from the server.js file in order to allow testing to operate
// Otherwise it causes jest to hang indefinitely
const express = require('express');
const path = require('path');

const app = express();

// Bind public page route
app.use(express.static(path.join(__dirname, 'public')));

// We'll want to move this in future to the router
app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/notes.html'));
});

module.exports = app;