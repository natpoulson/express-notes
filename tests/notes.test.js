// Declare required modules
const fs = require('fs');
const request = require('supertest');
const express = require('express');
const { notes } = require ('./routes/notes');

const app = express();

describe('Express.js', () => {
    describe('Public Routes', () => {
        it('root (/) returns public/index.html', async () => {

        });
        it('pages (/pages) returns public/pages.html', async () => {

        });
    });
    describe('API Routes', () => {
        it('GET /apis/notes exists', async () => {

        });
        it('GET /apis/notes/:id exists', async () => {

        });
        it('POST /apis/notes exists', async () => {

        });
        it('DELETE /apis/notes/:id exists', async () => {

        });
    });
});

describe('Pages API'), () => {
    describe('GET', () => {
        it('/apis/notes returns an array of notes', async () => {

        });
        it('/apis/notes/:id returns a specific note', async () => {

        });
    });
    describe('POST', () => {
        it('/apis/notes adds a new note', async () => {

        });
    });
    describe('DELETE', () =>  {
        it('/apis/notes/:id deletes the specified note', async () => {

        });
    });
};