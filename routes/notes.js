// TODO: Implement notes endpoints and export to router
const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

const paths = {
    prod: path.join(__dirname, "../db/db.json"),
    test: path.join(__dirname, '../db/test.json'),
}

// Helper functions
// ----------------
// Loading Notes
function loadNotes(debug = false) {
    const config = { encoding: 'utf-8' };

    if (debug) {
        return JSON.parse( fs.readFileSync( paths.test, config ) );
    }

    return JSON.parse( fs.readFileSync( paths.prod, config ) );
}

// Saving Notes
async function saveNotes(data, debug = false) {
    const config = { encoding: 'utf-8' };

    if (debug) {
        try {
            fs.writeFileSync(paths.test, JSON.stringify(data, null, '\t'), config);
        } catch(err) {
            console.log(err);
        }
        return;
    }

    try {
        fs.writeFileSync(paths.prod, JSON.stringify(data, null, '\t'), config);
    } catch(err) {
        console.log(err);
    }
    return;
}

// Check for debug header and return its value if found
function debugCheck(req) {
    if (req.headers['x-is-test'] === undefined) {
        return false;
    }

    return req.headers['x-is-test'];
}

// Check that the ID provided has no non-numerical characters
function isValidID(id) {
    if (/\D/g.test(id)) {
        return false;
    }

    return true;
}

// Parse the index as a number and subtract from 1 to use in zero-index arrays
// Return undefined if the adjusted index would be negative
function parseIndex(index) {
    const adjustedIndex = (Number.parseInt(index) - 1);
    if (adjustedIndex < 0) {
        return undefined;
    }

    return adjustedIndex;
}

function isNote(note) {
    // Make sure the note object has the required properties
    if (Object.keys(note).includes('title') && Object.keys(note).includes('text')) {
        // Nested the type check to make it a little cleaner than lumping them all into a single if statement
        if (typeof note.title === 'string' && typeof note.text === 'string') {
            return true;
        }
    }

    return false;
}

// Return all notes
notes.get('/', (req, res) => {
    const debug = debugCheck(req);
    const source = loadNotes(debug);
    res.status(200).json(source);
});

// Routes
// ------
notes.get('/:id', (req, res) => {
    // Filter out queries that include non-numerical values
    if (!isValidID(req.params.id)) {
        res.status(403).send("Invalid ID, must be a number");
        return;
    }

    // Load source file and parse the index
    const debug = debugCheck(req);
    const source = loadNotes(debug);
    const index = parseIndex(req.params.id);

    // Catch situations where the treated ID is -1 or lower (returns undefined in helper)
    if (index === undefined) {
        res.status(403).send("Non-zero ID required");
        return;
    }

    // Handle out of range requests
    if (index >= source.length) {
        res.status(404).send(`No note found at ID ${req.params.id}`);
        return
    }

    // Return the associated value
    if (source[index]) {
        res.status(200).json(source[index]);
        return;
    }

    // Assume by this point if nothing else caught it, then we don't have anything at that index
    res.status(404).send(`No note found with ID ${req.params.id}`);
});

notes.post('/', (req, res) => {
    // Screen out requests that don't have any body content
    if (!req.body) {
        res.status(403).send("No body detected in request");
        return;
    }

    // Screen out requests that have JSON objects lacking the required data
    if (!isNote(req.body)) {
        res.status(403).send("Body does not match expected request format (must have 'title' and 'text' properties of type 'string')");
        return;
    }

    // The purpose of the data object here is to make sure we're only adding in the values we're after, and disregard anything else
    const data = {
        title: req.body.title,
        text: req.body.text
    }

    // Load the test or prod DB file and add the data objext to it
    const debug = debugCheck(req);
    const source = loadNotes(debug);
    source.push(data);

    // Write back to the DB file
    saveNotes(source, debug);
});

notes.delete('/:id', (req, res) => {
    // Filter out queries that include non-numerical values
    if (!isValidID(req.params.id)) {
        res.status(403).send("Invalid ID, must be a number");
        return;
    }

    // Load source file and parse the index
    const debug = debugCheck(req);
    const source = loadNotes(debug);
    const index = parseIndex(req.params.id);

    // Catch situations where the treated ID is -1 or lower (returns undefined in helper)
    if (index === undefined) {
        res.status(403).send("Non-zero ID required");
        return;
    }

    // Handle out of range requests
    if (index >= source.length) {
        res.status(404).send(`No note found at ID ${req.params.id}`);
        return
    }

    // Filter out note and store amended file
    const output = source.filter((a, b) => {
        return b !== index;
    });
    saveNotes(output, debug);

    res.status(200).send(`Deleted note ${req.params.id} successfully`);
});

module.exports = notes;