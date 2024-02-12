// TODO: Add code for router function and connect routes
const router = require('express').Router();

const notes = require('./notes.js');

router.use('/notes', notes);

router.get('/', (req, res) => {
    res.status(200).json({message: 'API OK'});
});

module.exports = router;