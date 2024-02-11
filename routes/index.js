// TODO: Add code for router function and connect routes
const router = require('express').Router();

const notes = require('./notes');

router.use('/apis/notes', notes);

module.exports = router;