// TODO: Implement notes endpoints and export to router
const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

const paths = {
    prod: path.join(__dirname, "db/db.json"),
    test: path.join(__dirname, 'db/test.json'),
}

const source = loadNotes();

// Loading Notes
function loadNotes(debug = false) {
    const config = {
        encoding: 'utf-8'
    };

    if (debug) {
        return JSON.parse(
            fs.readFileSync(
                paths.test,
                config
            ));
    }

    return JSON.parse(
        fs.readFileSync(
            paths.prod,
            config
        ));
}

// Saving Notes
function saveNotes(debug = false) {
    const config = {
        encoding: 'utf-8'
    };

    if (debug) {
        JSON.stringify(
            fs.writeFileSync(
                paths.test,
                config
                ),
            null,
            '\t'
        );
    }

    return JSON.stringify(
        fs.writeFileSync(
            paths.prod,
            config
            ),
        null,
        '\t'
    );
}

notes.get('/apis/notes', () => {

});

notes.get('/apis/notes/:id', () => {

});

notes.post('/apis/notes', () => {

});

notes.delete('/apis/notes/:id', () => {

});