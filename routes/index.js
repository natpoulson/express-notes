// TODO: Add code for router function and connect routes
const router = require('express').Router();

// Route declarations
const notes = require('./notes.js');

// Route mounting
router.use('/notes', notes);

// Simple API route check to show that it's present
router.get('/', (req, res) => {
    res.status(200).json({message: 'API OK'});
});

module.exports = router;