// TODO: Add code for router function and connect routes
const router = require('express').Router();

const notes = require('./notes');

router.use('/apis/notes', notes);

router.get('/apis', (req, res) => {
    res.status(200).send("API accessible");
});

module.exports = router;